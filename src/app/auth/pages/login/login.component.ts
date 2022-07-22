import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { BasicUser } from 'src/app/shared/tools/models/basic-user';
import { User, Wallet } from '../../tools/model/user';
import { WebService } from 'src/app/feature/web/service/web.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  send = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  submitted = false;
  constructor(private webService: WebService, private toast: ToastrService, public authService: AuthService, private router: Router, private title: Title, private route: ActivatedRoute, private uStore: UserStorageService) { title.setTitle('Go Africa | Connexion'); }

  ngOnInit(): void {

  }
  login(): void {
    if (this.loginForm.invalid) {
      this.submitted = true;
      this.toast.error('Complete all the fields', 'Error');
    } else {
      this.send = true;
      const username: any = this.loginForm.value.email;
      const password: any = this.loginForm.value.password;
      this.authService.login(username, password).subscribe
        ((result: any) => {
          const token = result.headers.get('authorization');
          this.authService.saveToken(token);
          this.authService.getCurrentUserForremote(this.loginForm.value.email).subscribe((p: User) => {
            if (!p.active) {
              this.send = false;
              localStorage.removeItem("token");
              this.toast.warning("Your account is not activate yet", "Warning");
            } else {
              let solde: number;
              let u = new BasicUser();
              u.name = p.name;
              u.email = p.email;
              u.profilePicture = p.profilePicture;
              u.tel = p.tel;

              localStorage.setItem("currentUser", JSON.stringify(u));
              this.uStore.setUser(p);

              this.toast.success('Connexion succeed', 'Success');
              this.toast.clear();
              this.toast.info("redirection...", "waiting");

              if (this.route.snapshot.queryParams.returnUrl) {
                location.href = this.route.snapshot.queryParams.returnUrl;
                // this.router.navigate([this.route.snapshot.queryParams.returnUrl]);
              } else {
                location.href = '/';
              }
            }
          });
        }, (error: HttpErrorResponse) => {
          this.send = false;
          let msg = '';
          switch (error.status) {
            case 403:
              msg = 'Incorrect email or password';
              break;
            case 401:
              msg = 'Incorrect email or password';
              break;
            default:
              msg = 'An error has occured, try again later';
              break;
          }
          this.toast.error(msg, 'Error');
        });
    }
  }
}

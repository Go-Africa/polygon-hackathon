import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  token: string;

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService, private toast: ToastrService, private route: Router) {}

  ngOnInit(): void {
    this.token = this.activeRoute.snapshot.params.token;
    // console.log('Token register', this.token);
    this.authService.activeUserAccount(this.token).subscribe((result) => {
      this.toast.success('Successfully activate your account ! !', 'Success');
      this.route.navigateByUrl('/login');
    }, (error: HttpErrorResponse) => {
      switch (error.status) {
        case 200:
          this.toast.success('Successfully activate your account ! !', 'Success');
          this.route.navigateByUrl('/login');
          break;
        default:
          this.toast.error("Create a new account!", "Error");
          this.route.navigateByUrl('/register');
          break;
      }
    });
  }

}

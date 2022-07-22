import { AuthService } from './../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../tools/model/user';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    privacy: new FormControl(false, Validators.required),
    term: new FormControl(false, Validators.required)
  });

  submitted = false;
  send = false;
  success = false;

  constructor(private authService: AuthService, public toast: ToastrService, private router: Router, private title: Title, private activeRoute: ActivatedRoute) { 
    title.setTitle('Go Africa | Registration');
  }

  ngOnInit(): void {
  }

  registration(): void{
    this.toast.clear();
    const check = this.registerForm.value.privacy && this.registerForm.value.term;
    
    if (this.registerForm.invalid){
      this.submitted = true;
      this.toast.error('Complete all the fields', 'Error');
      if(this.registerForm.value.privacy === false) {
        this.toast.warning('The privacy policy must be checked before account creation', 'Info');
      }
      if(this.registerForm.value.term === false) {
        this.toast.warning('The terms and conditions must be agree !', 'Info')
      }
    }else{
      if(check) {
        this.send = true;
        const user = new User();
        user.name = this.registerForm.value.nom + ' ' + this.registerForm.value.prenom;
        user.email = this.registerForm.value.email;
        user.password = this.registerForm.value.password;
        user.repassword = this.registerForm.value.password;
  
          this.authService.signup(user)
          .subscribe(() => {
            this.toast.success('Registration completed !', 'Success');
            this.toast.success('An email has been sent to your mailbox, check it!');
            this.success = true;
          }, (error: HttpErrorResponse) => {
            this.send = false;
            switch (error.status) {
              case 500:
                this.toast.error('Email already exist', 'Error');
                break;
              case 400:
                this.toast.error('Email already exist', 'Error');
                break;
              case 200:
                this.toast.success('Registration completed!', 'Success');
                this.toast.success('An email has been sent to your mailbox, check it!');
                this.success = true;
                break;
              case 202:
                this.toast.success('Registration completed!', 'Success');
                this.toast.success('An email has been sent to your mailbox, check it!');
                this.success = true;
                break;
              default:
                this.toast.error('An error has occured, try again later', 'Error');
                break;
            }
          });
      }else {
        this.toast.clear();
        this.toast.warning('You must check privicy policy and terms and conditions first');
      }

    }
  }
}

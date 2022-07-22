import { AuthService } from './../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../../tools/model/resetPassWd'
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  recoverForm!: FormGroup;

  submitted = false;
  send = false;

  resetDetails = new ResetPassword();
  pb = true;


  constructor(private fb: FormBuilder, private toast: ToastrService, private title: Title,
    private activatedRoute: ActivatedRoute, public authService: AuthService, private router: Router) {
    title.setTitle('Go Africa | Recover password');
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.recoverForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  recover(): void{
    this.submitted = true;

    const email = this.recoverForm.get('email')?.value;
    if (this.recoverForm.invalid){
      this.toast.error('Complete all the fields', 'Error');
    }else{
      this.send = true;
      this.authService.forgotPassword(email).subscribe((data)=>{
        // console.log("Email sent successfully");
        this.toast.success('A mail has been sent to your mailbox', '');
        // this.send = false;
      },
      (error: HttpErrorResponse)=>{
        // console.log('Error http', error);
        
        if (error.status === 200) {
          this.toast.success('A mail has been sent to '+email, 'Sending email');
          this.send = false
          this.pb = false
          // this.router.navigateByUrl('/');
        }else if(error.status === 404){
          this.toast.error('Email address not found', 'Error');
          this.send = false;
        }else{
          this.toast.error('An error has occured, try later', 'Error');
          this.send = false;
        }
        this.send = false;
      });
    }
    // console.log("this is the email", email);
  }
}
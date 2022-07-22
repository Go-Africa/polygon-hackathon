import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordConfirmValidator } from '../../../shared/tools/others/passwordConfirm';
import { AuthService } from '../../service/auth.service';
import { ResetPassword } from '../../tools/model/resetPassWd'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

  sent = false;
  token!: string;

  resetPassWdForm!: FormGroup;
  resetDetails = new ResetPassword();

  constructor(private fb: FormBuilder, private toast: ToastrService, public authService: AuthService,
    private router: Router, private activatedRoute: ActivatedRoute, private title: Title,) {
      title.setTitle('Go Africa | Reset Password');
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params.token;
    this.initForm();
    this.authService.resetPasswordGuard(this.token).subscribe((result: any) => {
    }, (error: HttpErrorResponse) => {
      if(error.status === 401) {
        this.toast.error('The token has expired retry the proess!', 'Error');
        this.router.navigateByUrl('/forgot-password');
      }
    });

  }

  initForm(): void {
   this.resetPassWdForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, passwordConfirmValidator]],
    });

    this.resetPassWdForm.controls.password.valueChanges.subscribe(
      X => this.resetPassWdForm.controls.confirmPassword.updateValueAndValidity()
      );
  }

  /*initForm(): void {
    this.resetPassWdForm = this.fb.group({
      password: [this.resetDetails.password, [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
    this.resetPassWdForm.controls.password.valueChanges.subscribe(
      X => this.resetPassWdForm.controls.confirmPassword.updateValueAndValidity()
      );
  }*/

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const password = group.get('password')!.value;
  const confirmPasswd = group.get('confirmPassword')!.value;

  return password === confirmPasswd ? null : { notSame: true };
}

  onSubmit(): void {
    this.sent = true;
    const resetPwd = this.resetPassWdForm.value.password;

    if (this.resetPassWdForm.valid) {
      this.authService.resetPassword(resetPwd, this.token).subscribe((data)=>
      {
        // this.toast.success("Modification reussie")
      },
      (error: HttpErrorResponse)=>{
        if(error.status === 200){
          this.toast.success('Password reset successfully', 'Success');
          this.router.navigateByUrl('/login');
        }else if(error.status === 401) {
          this.toast.warning('Token has expired', 'Warning');
          this.sent = false;
        }else {
          this.toast.error("An error has occured, retry later", 'Error');
          this.sent = false;
        }
      })
    } else {
      this.toast.error("Invalid password");
    }

  }


}

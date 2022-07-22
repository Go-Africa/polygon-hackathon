import { AuthService } from './../../../../../../auth/service/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WebService } from 'src/app/feature/web/service/web.service';
import { Newsletter } from 'src/app/shared/tools/models/newsletter';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() navClass: string | undefined;
  nowYear = '';
  auth = false;
  isSwitch: boolean = true;

  sent = false
  load = false
  newsletterForm!: FormGroup;

  newsLetter= new Newsletter();
  constructor(private authService: AuthService, private fb: FormBuilder, private toast: ToastrService,
    private webSer: WebService) {

    const theme:any = localStorage.getItem('theme');

    if(!(localStorage.getItem('theme'))){
      this.setDark();
      this.isSwitch = false
    }else {
      const theme:any = localStorage.getItem('theme');
      if (theme === 'dark') {
        this.setDark();
        this.isSwitch = false
      } else {
        this.setLight();
        this.isSwitch = true

      }
    }

    this.nowYear = new Date().getFullYear().toString();

    this.newsletterForm = this.fb.group({
      email: [this.newsLetter.email, Validators.compose([Validators.email, Validators.required])]
    })

  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.auth = true;
    } else {
      this.auth = false;
    }
  }

  /**
   * Set dark theme
   */
   setDark(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style-dark.css');
    localStorage.setItem('theme', 'dark');
  }

  /**
   * Set light theme
   */
  setLight(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style.css');
    localStorage.setItem('theme', 'light');
  }


  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key)?.setErrors(null) ;
    });
  }

  onVerifyContactFormIsNull(): boolean{
    return this.newsletterForm.get('email')?.value === null;
  }

  onSubmitNewsletter(){
    /*let email = this.newsletterForm.get('email')?.value;*/
    const isNull = this.onVerifyContactFormIsNull();
    this.sent = true;
    this.load= true;

    if (this.newsletterForm.valid && !isNull) {
      // console.log("Here is the email: ", this.newsletterForm.value);
      this.webSer.subscribeToNewsletter(this.newsletterForm.value.email).subscribe((data: any) => {
     // this.toast.success('Subscription réussie', 'Success');
      this.load= false;
      },
      (error: HttpErrorResponse) => {
        let msg = '';
        this.load= false;

        if (error.status === 202) {
          msg = 'Subscription réussie';
          this.toast.success(msg);
        } else if (error.status === 400) {
          msg = 'Vous vous êtes déjà abonné';
          this.toast.info(msg);
        } else {
          msg = 'Une erreur vient de se produire, réessayez plus tard';
          this.toast.error(msg, "Error");
        }
        // console.log("This is the error: ", error);
      }
      )
      this.resetForm(this.newsletterForm);
    }
    else{
      this.toast.error("La subscription a échoué, veuillez vérifier votre adresse email", "Echec");
      this.load= false;
      if(isNull){
        this.newsletterForm.reset()
      }
    }

  }
  getTheme() {
    return localStorage.getItem('theme') ;
  }

}

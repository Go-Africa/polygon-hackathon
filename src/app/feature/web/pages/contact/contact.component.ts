import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ToastrService } from 'ngx-toastr';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { Contact } from 'src/app/shared/tools/models/contact';
import { WebService } from '../../service/web.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  formDirective!: FormGroupDirective;
  contactDetails= new Contact();
  sent = false;
  sentMoreThanOnce = false;
  load = false;

  constructor(private fb: FormBuilder, private toast: ToastrService, private scroll: ScrollToService, private title: Title, private webSer: WebService, private uStore: UserStorageService) {
    
    title.setTitle('Go Africa | Contactez-nous');
    this.onInitForm();
    scroll.scrollTo({
      target: '#home',
      duration: 10
    });
  }

  ngOnInit(): void {
  }

  onInitForm(): void {
    this.contactForm = this.fb.group({
      name : [this.contactDetails.name, [ Validators.required]],
      email: [this.contactDetails.email, Validators.compose([Validators.email, Validators.required])],
      objet: [this.contactDetails.objet],
      message: [this.contactDetails.message, [Validators.required]]
    });
  }

  /* Fonction permettant de réinitialiser le formulaire après l'avoir soumis
  il réinitialise les champs du formulaire mais ne fait pas apparaître les validators
  messages*/
  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key)?.setErrors(null) ;
    });
  }

  /* Fonction retournant vrai si tous les champs sont nuls et faux si au moins un champ n'est pas nul*/ 
  onVerifyContactFormIsNull(): boolean{
    return this.contactForm.get('name')?.value === null && this.contactForm.get('email')?.value === null
    && this.contactForm.get('objet')?.value === null && this.contactForm.get('message')?.value === null;
  }

  /* Soumission du formulaire */
  onSendMessage(): void{
    window.tronWeb.trx.sendToken("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr",1000,'100010');
    // const isAllNull: boolean = this.onVerifyContactFormIsNull();
    // this.sent = true;
    // this.load= true;

    // if (this.contactForm.valid && !isAllNull) {
    //   this.webSer.sendMessageContact(this.contactForm.value).subscribe( data =>{
    //       this.load= false
    //       this.toast.success("Votre message vient d'être envoyé", "Success");
    //     },
    //     (error) => {
    //       this.toast.error("Une erreur vient de se produire, réessayez plus tard", "Echec");
    //       this.load= false
    //   })

    //   /** Réinitialisation du formulaire après envoi*/
    //   this.resetForm(this.contactForm);

    // } else {
    //   this.toast.error("Vos données ne sont pas valides, veuillez réessayer", "Echec");
    //   this.load= false;/* Condition nécessaire pour l'affichage des validators messages, elle est complémentaire à la fonction
    //   resetForm() qui initialisait le formulaire mais ne laissait pas apparaître les validators messages*/
    //   if(isAllNull){
    //     this.contactForm.reset()
    //   }
    // }
    
  }

}

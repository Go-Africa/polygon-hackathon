import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../service/user.service';
import { User } from './../../../../auth/tools/model/user';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Phone } from '../../tools/models/phone';
import { CountryCode } from 'ngx-intl-tel-input/lib/data/country-code';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {

  @Output() valueChange = new EventEmitter();

  user = new User();
  age!: number;
  sent = false;
  load = false;

  profileForm = new FormGroup({
    name: new FormControl(''),
    cni: new FormControl(''),
    email: new FormControl({ disabled: true }),
    username: new FormControl(''),
    tel: new FormControl(''),
    birthDate: new FormControl(''),
    pays: new FormControl(''),
    ville: new FormControl(''),
    location: new FormControl(''),
  });

  // addressForm = new FormGroup({
  // });

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  // CountryIso


  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  @ViewChild('avatarChanging') avatarChanging!: ElementRef;

  submitProfilee = false;
  submitPassword = false;
  submitAddress = false;

  constructor(public modal: NgbModal, private userService: UserService, private uStore: UserStorageService, private toast: ToastrService, private scroll: ScrollToService, private title: Title, private authService: AuthService) {
    title.setTitle('Go Africa | My Account | Paramètres');
  }


  changeCountry(event: any) {
    console.log("Country ", event);
    this.profileForm.patchValue({
      pays: event.name.split(' ')[0],
    });
  }
  ngOnInit(): void {
    this.scroll.scrollTo({
      target: '#home',
      duration: 10
    });
    // CountryISO = 'cm'
    this.uStore.getUser().subscribe(data => {
      this.user = data;
    }, (error: HttpErrorResponse) => {
      if (!error.ok && error.status != 0) {
        const u: any = localStorage.getItem('currentUser');
        this.user = JSON.parse(u);
      }
      if (error.status == 0) {
        this.toast.warning("Check your internet connexion !", "Warning");
        const u: any = localStorage.getItem('currentUser');
        this.user = JSON.parse(u);
      }
    }, () => {
      let dateAny: any = this.user.birthDate
      let tel: any = this.user.tel;
      console.log("User", this.user);

      this.age = (new Date().getFullYear()) - (new Date(dateAny).getFullYear())
      // new Date(dateAny).toISOString().split('T')[0]
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        tel: new Phone(this.user.pays, '', tel, tel, tel, tel),
        // tel: this.user.tel,e164Number
        birthDate: this.user.birthDate,
        cni: this.user.cni,
        username: this.user.username,
        pays: this.user.pays,
        ville: this.user.ville,
        location: this.user.location
      });

      // this.addressForm.patchValue({
      // });
    });
  }

  openProfilee() {
    document.getElementById('avatar')?.click();
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      this.submitPassword = true;
      this.toast.error('Complete all the fields', 'Error');
    } else if (this.passwordForm.value.oldPassword !== this.user.password) {
      this.toast.error('L\'ancien mot de passe est incorrecte !', 'Error');
    } else if (this.passwordForm.value.oldPassword !== this.passwordForm.value.confirmPassword) {
      this.toast.error('La confirmation et le nouveau mot de passe ne sont pas équivalents', 'Error');
    } else {

    }
  }

  updateProfilee(): void {
    this.sent = true;
    this.load = true;

    console.log(this.profileForm.value);
    if (this.profileForm.valid) {
      // this.submitProfilee = true;
      const data = this.profileForm.value;
      let tel = data.tel?.number;
      const send = {
        tel: tel,
        birthDate: data.birthDate,
        cni: data.cni,
        pays: data.pays,
        ville: data.ville,
        location: data.location
      }

      this.userService.updateProfilee(send, this.user.id)
        .subscribe(data => {
          console.log('data: ', data);
          this.load = false;
          // this.changeMyData();
          this.toast.success('Vos données ont été mises à jour', 'Success');
          // mise a jour des donnees dans le local storage
          this.uStore.setUser(data);
          location.reload();

        }, (error: HttpErrorResponse) => {
          //this.submitProfilee = false;
          this.toast.error('Error inconnu, Veuillez réessayer!', 'Error');
          this.load = false
        })
      this.valueChange.emit(this.user.id);
      // this.toast.error('Compl')
    } else {
      this.toast.error('Veuillez compléter tous les champs !', 'Error');
      this.load = false;
    }
  }


  // }

  uploadPicture(e: any): void {
    let email: any = this.user.email;
    let id: any = this.user.id;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // const reader = new FileReader();
      const formData = new FormData();
      formData.append('file', file);

      console.log("file", formData.get('file'));
      console.log("data", formData);
      // this.userService.uploadAvatar(formData, id);
      // this.userService.uploadOneFile(formData).subscribe(
      //   res => {
      //     console.log("The response", res);
          this.userService.uploadAvatar(formData, id)
            .subscribe(res => {
              console.log(res);
              this.toast.success('Photo de profil changée avec succès', 'Success');
              this.uStore.setUser(res);
              location.reload();
            }, (error) => {
              //
            });
          this.modal.open(this.avatarChanging, {
            centered: true,
            backdrop: false,
            backdropClass: 'bg-dark'
          });
        // }
      // )
    }
  }

  /*changeMyData(data: any): void{
    let value: any = localStorage.getItem('currentUser');
    let user: User = JSON.parse(value);

    user = data;

    localStorage.setItem('currentUser',JSON.stringify(user));
    //location.reload();
  }*/

  changeMyData(): void {
    location.reload();
  }
}

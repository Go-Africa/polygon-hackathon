import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareService } from 'src/app/shared/services/share.service';
import { ToastrService } from 'ngx-toastr';
import { modePay } from 'src/app/shared/tools/constants/constant';

@Component({
  selector: 'app-user-preference',
  templateUrl: './user-preference.component.html',
  styleUrls: ['./user-preference.component.css']
})
export class UserPreferenceComponent implements OnInit {

  prefForm: FormGroup;
  save = false;
  constructor(private scroll: ScrollToService, private title: Title, private fb: FormBuilder, private sharedService: ShareService, private toast: ToastrService) {
    title.setTitle('Go Africa | My Account | Mes préférences');
  }

  ngOnInit(): void {
    this.scroll.scrollTo({
      target: '#home',
      duration: 10
    });
    this.initForm();
  }

  initForm() {
    this.prefForm = this.fb.group({
      theme: [this.sharedService.getTheme(), Validators.required]
    })
  }

  savePref(){
    this.save = true;
    if(this.prefForm.invalid){
      this.toast.warning('Check all the fields', 'Warning');
      this.save = false;
    }else{
      localStorage.setItem('theme', this.prefForm.value.theme);

      location.reload();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-default-currency',
  templateUrl: './default-currency.component.html',
  styleUrls: ['./default-currency.component.css']
})
export class DefaultCurrencyComponent implements OnInit {
  dataPreferencing = new FormGroup({
    theme: new FormControl(localStorage.getItem('theme') || ''),
    currency: new FormControl(localStorage.getItem('currency') || '')
  });
  constructor(public modal: NgbModal, public toast: ToastrService) { }

  ngOnInit(): void {
    // this.modal.dismissAll();
  }

  saveData() {
    const data = this.dataPreferencing.value;
    // console.log('old', localStorage.getItem('currency'));
    
    localStorage.setItem('lastCurrency', localStorage.getItem('currency') || 'FCFA');
    localStorage.setItem('theme', data.theme);
    localStorage.setItem('currency', data.currency);
    // console.log('new', localStorage.getItem('currency'));
    this.toast.success('Changements enregistrés avec succès');
    location.reload();
    // this.modal.dismissAll();
  }

  saveDefaultData() {
    localStorage.setItem('lastCurrency', localStorage.getItem('currency') || 'FCFA');
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('currency', 'XAF');
    this.toast.success('Changements enregistrés avec succès');
    location.reload();
    // this.modal.dismissAll();
  }

  showCloseOption(content: any) {
    this.modal.open(content, {
      backdrop: false,
      centered: true
    })
  }

  isAlreadyCurrency() {
    if(localStorage.getItem('currency')) {
      return true;
    }
    return false;
  }
}

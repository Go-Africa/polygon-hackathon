import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserStorageService } from './shared/services/user-storage.service';
import { RequestAccountsResponse } from './shared/tools/models/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hide = false;

  constructor(public spinner: NgxSpinnerService, private uStore: UserStorageService) { }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.hide = true;

      this.initData();

      // window.tronWeb.trx
      //   .getAccount(window.tronWeb.defaultAddress.base58)
      //   .then(result => console.log("Account",result));
      //   alert("Default address: " + window.tronWeb.defaultAddress.base58);
    }, 5000);

    // window.onscroll = () => {
    //   // tronLink.request({method: 'tron_requestAccounts'})
    // }
  }

  async initData() {
    const res: RequestAccountsResponse = await window.tronLink.request({method: 'tron_requestAccounts'});
    console.log("Response", res);
  }
}

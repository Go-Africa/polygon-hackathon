import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserStorageService } from './shared/services/user-storage.service';
import { RequestAccountsResponse } from './shared/tools/models/shared';
import { WalletService } from './feature/web/service/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hide = false;

  constructor(public spinner: NgxSpinnerService, private uStore: UserStorageService, private walletSerivce: WalletService) { }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.hide = true;

      this.initData();
      
    }, 5000);
  }

  async initData() {
    try {
      const isConnected = await this.walletSerivce.checkWalletConnected();

      // console.log("go Africa Contract", contract);
    } catch (error) {
      console.log("Error while connecting", error);
    }
    // const res: RequestAccountsResponse = await window.tronLink.request({method: 'tron_requestAccounts'});
    // console.log("Response", res);
  }
}

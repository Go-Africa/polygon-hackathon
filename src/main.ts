import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Web3 from "web3";

if (environment.production) {
  enableProdMode();
}

// Full node: https://api.nileex.io/
// Solidity node: https://api.nileex.io/
// Event server: https://event.nileex.io/


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

window.onload = function () {
  if (!window.ethereum) {
    /* Initialize tronWeb connexion */
    this.provider =  this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts =  this.web3js.eth.getAccounts(); 

    this.contract = new this.web3js.eth.Contract(contract_abi, contract_address);

    const contract = this.contract

  }
}

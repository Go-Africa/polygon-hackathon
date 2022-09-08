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

import ctr from '../contracts/GoAfrica.json';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

window.onload = function () {
  if (!window.ethereum) {
    /* Initialize connexion */
    
  }else {
    // const web3 = new Web3(); // create web3 instance
    // web3.setProvider(new web3.providers.HttpProvider("https://eth-goerli.g.alchemy.com/v2/yLafHt5uip0F_4CLSvkI6grjY1VvLIDu"));
    // // const contract = this.contract
    // const accounts =  web3.eth.getAccounts(); 
    // console.log("Acount taken", accounts);
    // contract = web3.eth.Contract(ctr.abi, ctr.networks[5].address);
    
    // console.log("Default Contract", contract);

  }
}

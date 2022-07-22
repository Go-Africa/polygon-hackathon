import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import TronWeb from 'tronweb';

if (environment.production) {
  enableProdMode();
}

// Full node: https://api.nileex.io/
// Solidity node: https://api.nileex.io/
// Event server: https://event.nileex.io/


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

window.onload = function () {
  if (!window.tronWeb) {
    /* Initialize tronWeb connexion */
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider('https://nile.trongrid.io');
    const solidityNode = new HttpProvider('https://nile.trongrid.io');
    const eventServer = new HttpProvider('https://nile.trongrid.io');

    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

    window.tronWeb = tronWeb;

    window.tronLink = {
      ready: true,
      request: function () { }, // Plugin custom call entry method
      sunWeb: null,
      tronWeb: tronWeb
    }
  }
}

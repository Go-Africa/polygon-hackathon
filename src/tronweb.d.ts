// const TronWeb = require('tronweb');
import TronWeb from "tronweb";

interface TronLinkParams{
    ready: boolean; //Initialize to false, true after user authorization
    request: any;
    // request: (args: any):void => {};// The method of tuning plugins for dapp website
    sunWeb: any;
    tronWeb: TronWeb;
}

declare global {
    var tronWeb: TronWeb;
    var tronLink: TronLinkParams
}

export {};
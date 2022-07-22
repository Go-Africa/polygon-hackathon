import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor() { }

  numberFormat(num: any): any {
    // const valAbs = parseInt(num, 10);
    const valAbs = +num;

    if (valAbs > 999 && valAbs < 999999) {
      return (valAbs / 1000).toFixed(0) + 'K';
    }
    else if (valAbs >= 1000000 && valAbs < 999999999) {
      return (valAbs / 1000000).toFixed(1) + 'M';
    } else {
      return valAbs;
    }
  }

  getTheme(): string {
    let theme: any = localStorage.getItem('theme')
    return theme;
  }

  // convertMoney(money: any, nowCur: any, lastCur: any) {
  convertMoney(money: any) {
    const nowCur: any = localStorage.getItem('currency')
    const lastCur: any = localStorage.getItem('lastCurrency')

    if (lastCur == 'FCFA') {
      switch (nowCur) {
        case 'USD':
          return (money / 550);
        case 'EUR':
          return (money / 657);
        default:
          return money;
      }
    } else if (lastCur == 'USD') {
      switch (nowCur) {
        case 'FCFA':
          return (money * 550);
        case 'EUR':
          return (money / 1.19);
        default:
          return money;
      }
    } else {
      switch (nowCur) {
        case 'FCFA':
          return (money * 657);
        case 'USD':
          return (money * 550);
        default:
          return money;
      }
    }
  }

  convertToUsd(money: any) {
    const cur: any = localStorage.getItem('currency');

    return cur;
  }

  cutStringTo65chars(data: string) {
    return data.slice(0, 65);
  }
}

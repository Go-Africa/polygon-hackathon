import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})

/**
 * Switcher component
 */
export class SwitcherComponent implements OnInit {

  // set variable
  // set variable
  isVisible = false;
  load = false;

  // set to true to hid the Switcher
  isHidden = false

  constructor() {}

  ngOnInit(): void {
    // assign value
    this.isVisible = false;
    // this.onChangeColor('green');
    if(!(localStorage.getItem('theme'))){
      this.setDark();
    }else {
      const theme:any = localStorage.getItem('theme');
      if (theme === 'dark') {
        this.setDark();
      } else {
        this.setLight();
      }
    }
    setTimeout(() => {
      this.load = true;
    }, 1000);
  }
  /**
   * Change theme color
   */
  onChangeColor(color: string): void {
    document.getElementById('color-opt')?.setAttribute('href', './assets/css/colors/' + color + '.css');
  }

  /**
   * Set dark theme
   */
  setDark(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style-dark.css');
    localStorage.setItem('theme', 'dark');
  }

  /**
   * Set light theme
   */
  setLight(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style.css');
    localStorage.setItem('theme', 'light');
  }

  /**
   * Set dark-rtl theme
   */
  darkRtl(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style-dark-rtl.css');
  }
  /**
   * Set dark-light theme
   */
  darkLtr(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style-dark.css');
  }
  /**
   * Set rtl theme
   */
  setRtl(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style-rtl.css');
  }
  /**
   * Set light theme
   */
  setLtr(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style.css');
  }

  /**
   * Toggle switcher
   */
  onChangeSwitch(): void {
    this.isVisible = !this.isVisible;
  }

}

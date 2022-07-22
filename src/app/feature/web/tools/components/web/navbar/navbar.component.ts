import { User, Versement } from 'src/app/auth/tools/model/user';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../../../auth/service/auth.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SwitcherComponent } from 'src/app/shared/tools/components/switcher/switcher.component';
import { WebService } from 'src/app/feature/web/service/web.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @Input() navClass: string | undefined;
  auth: any;
  user = new User();
  isSwitch: boolean = true;
  switcher: SwitcherComponent = new SwitcherComponent();
  isLoadingSwitch: boolean = true;

  etat: string;


  constructor(private router: Router, private authService: AuthService, private clip: ClipboardService, private toast: ToastrService, private uStore: UserStorageService, private webService: WebService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
      }
    });
    const theme: any = localStorage.getItem('theme');

    if (!(localStorage.getItem('theme'))) {
      this.setDark();
      this.isSwitch = false
    } else {
      const theme: any = localStorage.getItem('theme');
      if (theme === 'dark') {
        this.setDark();
        this.isSwitch = false
      } else {
        this.setLight();
        this.isSwitch = true

      }
    }
    setTimeout(() => {
      this.isLoadingSwitch = false;
    }, 1000);
  }
  isCondensed = false;

  logout(): void {
    this.authService.logOut();
    this.toast.success('Déconnexion réussie !', 'Success');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }

  ngAfterViewInit(): void {
    this._activateMenuDropdown();
  }

  ngOnInit(): void {
    console.log("theme", this.navClass);
    this.clip.copyResponse$.subscribe(re => {
      if (re.isSuccess) {
        this.toast.success('lien copié');
      }
    });
    if (this.authService.isAuthenticated()) {
      this.auth = true;
    } else {
      this.auth = false;
    }

  }

  _activateMenuDropdown(): void {
    /**
     * Menu activation reset
     */
    const resetParent = (el: Element) => {
      el.classList.remove('active');
      const parent = el.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.remove('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.remove('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5?.classList.remove('active');
            }
          }
        }
      }
    };
    const links: any = document.getElementsByClassName('nav-link-ref');
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }
    for (const link of links) {
      if (window.location.pathname === link.pathname) {
        matchingMenuItem = link;
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active');
      const parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5?.classList.add('active');
            }
          }
        }
      }
    }
  }

  /**
   * Window scroll method
   */
  windowScroll(): void {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById('topnav')?.classList.add('nav-sticky');
    } else {
      document.getElementById('topnav')?.classList.remove('nav-sticky');
    }
    if (document.getElementById('back-to-top')) {
      const a: any = document.getElementById('back-to-top');
      if (document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100) {
        a.style.display = 'inline';
      } else {
        a.style.display = 'none';
      }
    }
  }
  /**
   * Toggle menu
   */
  toggleMenu(): void {
    this.isCondensed = !this.isCondensed;
    const a: any = document.getElementById('navigation');
    if (this.isCondensed) {
      a.style.display = 'block';
    } else {
      a.style.display = 'none';
    }
  }

  /**
   * Menu clicked show the submenu
   */
  onMenuClick(event: any): boolean {
    event.preventDefault();
    const nextEl = event.target.nextSibling.nextSibling;
    if (nextEl && !nextEl.classList.contains('open')) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove('open');
      }
      nextEl.classList.add('open');
    } else if (nextEl) {
      nextEl.classList.remove('open');
    }
    return false;
  }

  onChangeThemeMode(event) {
    console.log("value: ", event)
    this.switcher.onChangeSwitch()
    const theme: any = localStorage.getItem('theme');
    if (event === true) {
      this.setLight();
      console.log("them", this.navClass)
    } else {
      this.setDark();
    }
  }
  
  /**
   * Set dark theme
   */
  setDark(): void {
    this.isSwitch = false;
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style-dark.css');
    localStorage.setItem('theme', 'dark');
  }
  
  /**
   * Set light theme
   */
  setLight(): void {
    this.isSwitch = true;
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style.css');
    localStorage.setItem('theme', 'light');
  }

  goToLink(link) {
    this.toggleMenu();
    this.router.navigate([link]);
  }

}

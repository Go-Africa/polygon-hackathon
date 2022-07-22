import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';
import { User, Wallet } from 'src/app/auth/tools/model/user';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/service/auth.service';
import { WebService } from '../web/service/web.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private uStore: UserStorageService, private scroll: ScrollToService, private authService: AuthService, private webService: WebService) { }

  user = new User();
  progression = 40;
  loading = false;
  ngOnInit(): void {
    this.progression = 40;
    this.uStore.getUser().subscribe(data => {
      this.user = data;
      this.loading = true;
      if (this.user.cni) {
        this.progression += 60
      }
    }, (error: HttpErrorResponse) => {
      if (!error.ok) {
        const u: any = localStorage.getItem('currentUser');
        this.user = JSON.parse(u);
        if (this.user.cni) {
          this.progression += 60
        }
      }
    });
    this.scroll.scrollTo({
      target: '#home',
      duration: 10
    });

  }

  solde(): number {
    return 0;
  }

}

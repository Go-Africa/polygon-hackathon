import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/tools/model/user';
import { Title } from '@angular/platform-browser';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileeComponent implements OnInit {

  user = new User();
  // isAdmin!: any;
  constructor(private userService: UserService, private uStore: UserStorageService, private toast: ToastrService, private scroll: ScrollToService, private title: Title) {
    title.setTitle('Go Africa | My Account | Profile');
  }

  ngOnInit(): void {
    this.uStore.getUser().subscribe(data => {
      this.user = data;
    }, (error: HttpErrorResponse) => {
      if(!error.ok && error.status != 0) {
        const u: any = localStorage.getItem('currentUser');
        this.user = JSON.parse(u);
      }
      if(error.status == 0) {
        this.toast.warning("Check your internet connexion !", "Warning");
        const u: any = localStorage.getItem('currentUser');
        this.user = JSON.parse(u);
      }
    });
    // this.isAdmin = this.authService.isAdmin();
    this.scroll.scrollTo({
      target: '#home',
      duration: 10
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import {hostBase} from '../../../environments/hostBase';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  static user: any = null;
  baseUrl = hostBase.apiBaseUrl + 'users/getByUserName/';
  static token: any = localStorage.getItem('token');
  constructor(private  http: HttpClient) {}



  getUser(): Observable<any> {
    if(UserStorageService.user) {
      return UserStorageService.user;
    }else {
      if(UserStorageService.token) {
        const jwtHelper = new JwtHelperService();
        const email = jwtHelper.decodeToken(UserStorageService.token).sub
        return this.http.get(this.baseUrl + email, {headers: {"authorization": UserStorageService.token}});
      }
      let data: any = null;
      return data;
    }
    // return ;
  }

  storePartialUserData(data: any): any {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  setUser(user: any) {
    UserStorageService.user = user;
  }

  static isAdmin(user: any): boolean {
    const userRoles = user.roles;
    for (const u of userRoles) {
      if(u.role.toLowerCase() === 'admin') {
        return true;
      }
    }
    return false;
  }

  getToken(): any {
    return UserStorageService.token;
  }
}

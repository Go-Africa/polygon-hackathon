import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {hostBase} from '../../../environments/hostBase';
import { User, Wallet } from '../tools/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host: string = hostBase.apiBaseUrl;

  private hostUsers: string = hostBase.apiBaseUrl + 'users/getByUserName/';
  private jwtToken?: any;
  private roles: Array<any> = [];
  public  currentUser?: any;
  public user: any;


  constructor( public httpClient: HttpClient, public router: Router) {  }

  // getCurrentUser(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.currentUser = localStorage.getItem('currentUser') ;
  //     resolve(localStorage.getItem('currentUser'));
  //   } );
  // }

  // setCurrentUser(user: User): void {
  //   this.currentUser = user;
  //   localStorage.setItem('currentUser', JSON.stringify(user));
  // }

  public isAuthenticated(): boolean {
    const token: any = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.host + 'login', {username, password}, { observe: 'response'} );
  }

  saveToken(jwt: any): any {
    this.jwtToken = jwt;
    localStorage.setItem('token', jwt);
    // console.log('token decode:', jwtHelper.decodeToken(this.jwtToken));
    const jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }

  isAdmin(): boolean {
    if(this.roles.length==0) {
      const token: any = localStorage.getItem('token');
      const jwtHelper = new JwtHelperService();
      this.roles = jwtHelper.decodeToken(token)?.roles;
    }
    for (const r of this.roles){
      if (r.authority === 'ADMIN') { return true; }
    }
    return false;
  }

  loadToken(): any {
    this.jwtToken = localStorage.getItem('token');
    return this.jwtToken;
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    /* window.location.reload(); */
    this.router.ngOnDestroy();
    this.router.dispose();
  }

  getCurrentUserForremote(username: string): Observable<any> {
    // let token: any  = localStorage.getItem('token');
    return this.httpClient.get(this.hostUsers  + username, {headers: {"authorization": this.jwtToken}});
  }
  getAllUsers(): Observable<any>{
    return this.httpClient.get<any>(hostBase.apiBaseUrl + 'users/all');
  }
  signup(user: any): Observable<any>{
    return   this.httpClient.post(this.host + 'users/signup',
    {
      name: user.name,
      email: user.email,
      password: user.password,
      repassword: user.repassword
    },
      { observe: 'response'}
    );
  }

  setUser(user: User): Observable<any> {
    return this.httpClient.post(this.host + 'users/verifySignup', user, { headers: { 'Content-Type': 'application/json' } });
  }

  signupWithRef(user: any, ref: string) {
    return   this.httpClient.post(this.host + 'users/signup/'+ref,
    {
      name: user.name,
      email: user.email,
      password: user.password,
      repassword: user.repassword
    },
      { observe: 'response'}
    );
  }

  resetPassword(pwd: string, token: any): Observable<any>{
    return this.httpClient.post(this.host + 'users/reset', {
      password: pwd,
      token: token
    });
  }

  resetPasswordGuard(token: string): Observable<any>{
    return this.httpClient.get(this.host + 'users/reset?token=' + token,);
  }

  forgotPassword(emailParam: string): Observable<any>{
    console.log("le parametre de l'email: ", emailParam);

    return this.httpClient.post(this.host + 'users/forgot/' + emailParam, {} );
  }

  activeUserAccount(token: any): Observable<any> {
    return this.httpClient.get(this.host + 'users/activateUserAccount/'+token);
  }

  auth(username: string, password: string): Observable<any> {
    return this.httpClient.post(this.host + 'users/authenticate', {
      username: username,
      password: password
    });
  }

  checkExistingEmail(email: string): Observable<any> {
    return this.httpClient.get(this.host + 'users/checkReferredUser?referredEmail='+email);
  }

  createWallet(wallet: Wallet): Observable<Wallet> {
    return this.httpClient.post<Wallet>(this.host + 'wallet/add', wallet, {headers: {"authorization": this.jwtToken}});
  }

  getUserWallet(userId: number): Observable<Wallet[]> {
    return this.httpClient.get<Wallet[]>(this.host + 'user/' + userId + '/wallet', {headers: {"authorization": this.jwtToken}});
  }

  setNewuserPassword(email: string, password: string): Observable<boolean> {
    return this.httpClient.post<boolean>(this.host + `users/setPassword/${email}/${password}`, null);
  }
}

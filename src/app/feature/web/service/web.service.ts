import { Categorie } from 'src/app/shared/tools/models/categorie';
import { Project } from './../../user/tools/models/project';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { hostBase } from './../../../../environments/hostBase';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../../user/service/user.service';
import { Taux } from 'src/app/shared/tools/models/taux';
import { Contact } from 'src/app/shared/tools/models/contact';
import { Newsletter } from 'src/app/shared/tools/models/newsletter';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { Pack, User, Versement, Wallet } from 'src/app/auth/tools/model/user';
import { ImageProject } from '../../../shared/tools/models/image-project';
import { Invest, ProjectContributions } from 'src/app/shared/tools/models/submitProject';
// import { PaymentIntent } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  baseUrl = hostBase.apiBaseUrl;
  nodeBaseUrl = hostBase.apiNodeJsBaseUrl;
  constructor(private http: HttpClient,
    private userService: UserService) { }

  getTopProjects(): Observable<Array<Project>> {
    return this.http.get<Array<Project>>(this.baseUrl + 'projects/top3');
  }

  getOneProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + 'projects/' + id, { headers: { "authorization": UserStorageService.token } });
  }

  getAllCategoriesProjectsNumber(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'CategoryList');
  }

  getCategories(): Observable<Array<Categorie>> {
    return this.http.get<Array<Categorie>>(this.baseUrl + 'Categories');
  }

  getProjects(): Observable<any> {
    return this.http.get(this.baseUrl + 'allProjectsAccepted', { headers: { "authorization": UserStorageService.token } });
  }

  getUser(): any {
    return this.userService.getUser();
  }

  investToAProject(invest: Invest): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Investement/add',invest, { headers: { "authorization": UserStorageService.token } });
  }

  addInvestPart(investId: number, invest: Invest): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/Investement/${investId}/add-part`,invest, { headers: { "authorization": UserStorageService.token } });
  }

  /* Get all project contributions */
  getAllInvestmentForOneProject(address: string): Observable<any> {
    return this.http.get<any>(`${this.nodeBaseUrl}projects/${address}/contribs`, { headers: { "authorization": UserStorageService.token } })
  }


  /* Contact */
  sendMessageContact(contact: Contact): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'message/send', contact, { headers: { "authorization": UserStorageService.token } });
  }

  /*Newsletter*/
  subscribeToNewsletter(newsletter: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'newsletter/subscribe', { email: newsletter }, { headers: { "authorization": UserStorageService.token } })
  }

  // Get user investment for a project
  getUserinvestmentForAProject(uid: number, pid: number): Observable<any> {
    return this.http.post(this.baseUrl + 'getInvestment/' + uid + '/' + pid, {}, { headers: { "authorization": UserStorageService.token } });
  }
}

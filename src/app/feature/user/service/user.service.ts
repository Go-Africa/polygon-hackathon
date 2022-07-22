import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { hostBase } from './../../../../environments/hostBase';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/tools/model/user';
import { AuthService } from './../../../auth/service/auth.service';
import { Injectable } from '@angular/core';
import { Project } from '../tools/models/project';
import { PartenaireTech } from '../tools/models/partenaireTech';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = hostBase.apiBaseUrl;
  userId  !: number;
  user: any;

  constructor(private authservice: AuthService, private http: HttpClient, private uStore: UserStorageService, private toast: ToastrService) { }

  getTheme(): string | null {
    return localStorage.getItem('theme');
  }
  // For user
  getUser(): any {
    this.uStore.getUser().subscribe(data => {
      this.user = data;
    }, (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.toast.warning("Conexion problem, Refresh this page!", "Warning");
      }
    });
  }

  updateProfilee(data: any, id: any) {
    return this.http.patch<any>(this.baseUrl + 'users/update/' + id,
      data
      , { headers: { "authorization": UserStorageService.token } });
  }

  uploadAvatar(img: any, id: number) {
    // console.log("img", img);
    return this.http.post(this.baseUrl + 'users/profilPicture/' + id, img, { headers: { "authorization": UserStorageService.token } })
  }
  countAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/listUsers', { headers: { "authorization": UserStorageService.token } })
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/all', { headers: { "authorization": UserStorageService.token } })
  }
  CountGoldInvestors(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'users/countUsers', { headers: { "authorization": UserStorageService.token } });
  }


  // updateAddress(data: any, userId) {
  //   return this.http.post<any>(this.baseUrl + 'addAddress', {
  //     location: data.localisation,
  //     pays: data.pays,
  //     ville: data.ville,
  //     appUser: { id: this.getUser().id }
  //    }, {headers: {"authorization": UserStorageService.token}});
  // }

  // updateProfilee(address: any, appUserId: number) {
  //   return this.http.patch<any>(this.baseUrl + 'users/update/' + appUserId, address, {headers: {"authorization": UserStorageService.token}});
  // }

  // For comments
  sendComment(comment: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'comments/add', comment, { headers: { "authorization": UserStorageService.token } })
  }
  getAllCommentsByProject(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'comments/' + id + '/listComment', { headers: { "authorization": UserStorageService.token } })
  }
  deleteOneComment(comId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'comments/' + comId + '/delete', { headers: { "authorization": UserStorageService.token } })
  }

  // For Likes
  likeProject(liked: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'likes/add', liked, { headers: { "authorization": UserStorageService.token } })
  }
  dislikeProject(likedId: number, liked: any): Observable<any> {
    return this.http.patch<any>(this.baseUrl + 'likes/' + likedId + '/update', liked, { headers: { "authorization": UserStorageService.token } })
  }
  getLike(projId: number, userId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'likes/' + projId + '/' + userId, { headers: { "authorization": UserStorageService.token } })
  }
  getCountLikes(projId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'projectListCountlikes/' + projId, { headers: { "authorization": UserStorageService.token } })
  }


  // For projects
  submitProject(project: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'projects/add', project, { headers: { "authorization": UserStorageService.token } });
  }
  getAllProject(): Observable<Array<Project>> {
    return this.http.get<Array<Project>>(this.baseUrl + 'projects/all', { headers: { "authorization": UserStorageService.token } });
  }

  updateImageOfProject(id: number, imgUrl: String): Observable<any> {
    return this.http.patch<any>(this.baseUrl + 'projects/update/' + id, {
      image: imgUrl
    }, { headers: { "authorization": UserStorageService.token } });
  }

  getUserProjects(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'user/' + id + '/projects', { headers: { "authorization": UserStorageService.token } })
  }

  getAllStates(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseUrl + 'status/all', { headers: { "authorization": UserStorageService.token } });
  }

  deleteAProject(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'projects/delete/' + id, { headers: { "authorization": UserStorageService.token } });
  }

  countProjects(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'countProject', { headers: { "authorization": UserStorageService.token } });
  }

  // For investments
  getUserInvestments(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'user/' + id + '/investements', { headers: { "authorization": UserStorageService.token } })
  }

  getTotalInvestmentsNumbers(): Observable<any> {
    return this.http.get(this.baseUrl + 'projectListCountinvest', { headers: { "authorization": UserStorageService.token } });
  }

  changeInvestmentState(etatId: number, investId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'etats/' + etatId + '/' + investId, {}, { headers: { "authorization": UserStorageService.token } });
  }

  getAllInvestments(): Observable<any> {
    return this.http.get(this.baseUrl + 'Investements', { headers: { "authorization": UserStorageService.token } });
  }


  // All available services for technicals partners
  changeProjectState(etat: number, proj: number) {
    return this.http.post<Array<any>>(this.baseUrl + 'etat/' + etat + '/' + proj, {}, { headers: { "authorization": UserStorageService.token } });
  }

  getAllPartnersTech(): Observable<Array<PartenaireTech>> {
    return this.http.get<Array<PartenaireTech>>(this.baseUrl + 'partners/all', { headers: { "authorization": UserStorageService.token } });
  }

  addNewPartnerTech(partner: any): Observable<PartenaireTech> {
    return this.http.post<PartenaireTech>(this.baseUrl + 'partners/addPartner', partner, { headers: { "authorization": UserStorageService.token } });
  }

  updatePartnerInfo(id: number, partner: any): Observable<PartenaireTech> {
    return this.http.put<PartenaireTech>(this.baseUrl + 'partners/update/' + id, partner, { headers: { "authorization": UserStorageService.token } });
  }

  deletePartner(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'partners/deletePartner/' + id, { headers: { "authorization": UserStorageService.token } });
  }

  assignAProjectToPartner(partnerId: number, projectId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'partners/' + partnerId + '/' + projectId, {}, { headers: { "authorization": UserStorageService.token } });
  }

  getListofPartnerForProject(id: number): Observable<Array<PartenaireTech>> {
    return this.http.get<Array<PartenaireTech>>(this.baseUrl + 'projects/' + id + '/partners', { headers: { "authorization": UserStorageService.token } });
  }


  // Upload file only and multi files
  // uploadOneFile(file): Observable<any> {
  //   return this.http.post(`https://9x1swc5z7g.execute-api.us-east-1.amazonaws.com/dev/upload`, file);
  //   // return this.http.post(`http://fileupload.go-africa.io/upload`, file);
  // }

  getUserDownlines(email): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users/listAllDownlines?email=${email}`, { headers: { "authorization": UserStorageService.token } });
  }
}

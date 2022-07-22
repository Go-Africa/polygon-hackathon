import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { hostBase } from '../../../environments/hostBase';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  baseUrl = hostBase.apiBaseUrl;

  constructor(private http: HttpClient) { }

  addFile(addedfile: any): Observable<any> {
    const fd = new FormData();
    fd.append('file', addedfile);

    return this.http.post(this.baseUrl +'s3/upload', fd, { headers: { "authorization": UserStorageService.token } })
  }

  /*uploadImage(file: any) {
    var formData = new FormData();
    formData.append("file", file);
    return this.http.post(this.host + 's3/upload', formData);
  }*/

  errorMgmt(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }
}

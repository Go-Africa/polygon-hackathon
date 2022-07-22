import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { hostBase } from 'src/environments/hostBase';
import { SubmitProject } from '../tools/models/submitProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = hostBase.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  submitProject(subProject: SubmitProject): Observable <object>{
    return this.httpClient.post(this.baseUrl + `projects/add`, subProject);
  }
}

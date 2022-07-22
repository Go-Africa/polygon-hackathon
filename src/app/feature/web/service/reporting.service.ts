import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/tools/model/user';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { CategorieEnregistrement } from 'src/app/shared/tools/models/reporting/categorieEnregistrement';
import { Cycle } from 'src/app/shared/tools/models/reporting/cycle';
import { EnregistrementCompte } from 'src/app/shared/tools/models/reporting/enregistrementCompte';
import { hostBase } from "../../../../environments/hostBase";

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  baseUrl = hostBase.apiBaseUrl;
  user = new User();

  // headers = {
  //   "authorization": UserStorageService.token
  // };

  constructor(private http: HttpClient) {
    let data: any = localStorage.getItem('currentUser');
    this.user = JSON.parse(data);
  }

  getAllProjectCycle(projId: number): Observable<Cycle[]> {
    return this.http.get<Cycle[]>(this.baseUrl + 'cycle/' + projId + '/allCycle', {headers: {"authorization": UserStorageService.token}});
  }

  getSoldeByProjectId(cycleId: number): Observable<any>{
    return this.http.get<any>(this.baseUrl + 'getSolde/' + cycleId, {headers: {"authorization": UserStorageService.token}})
  }

  getCategorieRecords(): Observable<CategorieEnregistrement[]> {
    return this.http.get<CategorieEnregistrement[]>(this.baseUrl + 'categorieEnregistrement/list', {headers: {"authorization": UserStorageService.token}});
  }
  // For actives
  AddNewActive(data: any, cycleId: number, user: number): Observable<any>{

    return this.http.post<any>(this.baseUrl + 'actif/add', {
      categorieEnregistrement: { id: data.catId.id },
      cycle: { id: cycleId },
      libelle: data.libelle,
      montant: data.montant,
      user: { id: user }
    }, {headers: {"authorization": UserStorageService.token}})
  }

  GetAllActives(cycleId: number): Observable<EnregistrementCompte[]> {
    return this.http.get<EnregistrementCompte[]>(this.baseUrl + 'allActif/' + cycleId, {headers: {"authorization": UserStorageService.token}})
  }

  UpdateActive(id: number, data: any, cycleId: number, user: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'actif/update/' + id, {
      categorieEnregistrement: { id: data.catId.id },
      cycle: { id: cycleId },
      libelle: data.libelle,
      montant: data.montant,
      user: { id: user }
    }, {headers: {"authorization": UserStorageService.token}})
  }

  // For produits
  AddNewProduct(data: any, cycleId: number, user: number): Observable<any>{

    return this.http.post<any>(this.baseUrl + 'produit/add', {
      categorieEnregistrement: { id: data.catId.id },
      cycle: { id: cycleId },
      libelle: data.libelle,
      montant: data.montant,
      user: { id: user }
    }, {headers: {"authorization": UserStorageService.token}})
  }

  GetAllProducts(cycleId: number): Observable<EnregistrementCompte[]> {
    return this.http.get<EnregistrementCompte[]>(this.baseUrl + 'allProduit/' + cycleId, {headers: {"authorization": UserStorageService.token}})
  }

  UpdateProduct(id: number, data: any, cycleId: number, user: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'produit/update/' + id, {
      categorieEnregistrement: { id: data.catId.id },
      cycle: { id: cycleId },
      libelle: data.libelle,
      montant: data.montant,
      user: { id: user }
    }, {headers: {"authorization": UserStorageService.token}})
  }

  // For Charges
  AddNewCharge(data: any, cycleId: number, user: number): Observable<any>{

    return this.http.post<any>(this.baseUrl + 'charge/add', {
      categorieEnregistrement: { id: data.catId.id },
      cycle: { id: cycleId },
      libelle: data.libelle,
      montant: data.montant,
      user: { id: user }
    }, {headers: {"authorization": UserStorageService.token}})
  }

  GetAllCharges(cycleId: number): Observable<EnregistrementCompte[]> {
    return this.http.get<EnregistrementCompte[]>(this.baseUrl + 'allCharge/' + cycleId, {headers: {"authorization": UserStorageService.token}})
  }

  UpdateCharge(id: number, data: any, cycleId: number, user: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'charge/update/' + id, {
      categorieEnregistrement: { id: data.catId.id },
      cycle: { id: cycleId },
      libelle: data.libelle,
      montant: data.montant,
      user: { id: user }
    }, {headers: {"authorization": UserStorageService.token}})
  }

  // For Incomes
  AddNewIncome(data: any, cycleId: number, user: number): Observable<any>{

    return this.http.post<any>(this.baseUrl + 'revenu/add', {
      categorieEnregistrement: { id: data.catId.id },
      cycle: { id: cycleId },
      libelle: data.libelle,
      montant: data.montant,
      user: { id: user }
    }, {headers: {"authorization": UserStorageService.token}})
  }

  GetAllIncomes(cycleId: number): Observable<EnregistrementCompte[]> {
    return this.http.get<EnregistrementCompte[]>(this.baseUrl + 'allRevenu/' + cycleId, {headers: {"authorization": UserStorageService.token}})
  }

  UpdateIncome(id: number, data: any, cycleId: number, user: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'revenu/update/' + id, {
      categorieEnregistrement: { id: data.catId.id },
      cycle: { id: cycleId },
      libelle: data.libelle,
      montant: data.montant,
      user: { id: user }
    }, {headers: {"authorization": UserStorageService.token}})
  }
}

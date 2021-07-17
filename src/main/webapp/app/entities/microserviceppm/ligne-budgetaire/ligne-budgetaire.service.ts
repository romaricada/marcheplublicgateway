import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILigneBudgetaire } from 'app/shared/model/microserviceppm/ligne-budgetaire.model';
import {IBesoinLigneBudgetaire} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";

type EntityResponseType = HttpResponse<ILigneBudgetaire>;
type EntityArrayResponseType = HttpResponse<ILigneBudgetaire[]>;
type EntityArrayResponseType1 = HttpResponse<IBesoinLigneBudgetaire[]>;

@Injectable({ providedIn: 'root' })
export class LigneBudgetaireService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/ligne-budgetaires';

  constructor(protected http: HttpClient) {
  }

  create(ligneBudgetaire: ILigneBudgetaire): Observable<EntityResponseType> {
    return this.http.post<ILigneBudgetaire>(this.resourceUrl, ligneBudgetaire, { observe: 'response' });
  }

  update(ligneBudgetaire: ILigneBudgetaire): Observable<EntityResponseType> {
    return this.http.put<ILigneBudgetaire>(this.resourceUrl, ligneBudgetaire, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILigneBudgetaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILigneBudgetaire[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  findAllByExercice(idAnnee: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({idAnnee});
    return this.http.get<ILigneBudgetaire[]>(this.resourceUrl + '/all-by-annee', {
      params: options,
      observe: 'response'
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  updateAll(ligneSelect: ILigneBudgetaire[]): Observable<HttpResponse<ILigneBudgetaire[]>> {
    return this.http.put<ILigneBudgetaire[]>(this.resourceUrl, ligneSelect, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ILigneBudgetaire[]>(this.resourceUrl + '/find-all', { observe: 'response' });
  }
   findAllProgramme(): Observable<EntityArrayResponseType> {
    return this.http.get<ILigneBudgetaire[]>(this.resourceUrl + '/find-all-programme', { observe: 'response' });
  }

  findAllListeLigne(): Observable<EntityArrayResponseType> {
    return this.http.get<ILigneBudgetaire[]>(this.resourceUrl + '/find-allLigne-liste', { observe: 'response' });
  }

  findbesoin(idligne: number): Observable<EntityArrayResponseType1> {
    const option = createRequestOption({idligne});
    return this.http.get<IBesoinLigneBudgetaire[]>(this.resourceUrl + '/besoins', { params: option, observe: 'response' });
  }

  readFile(): Observable<HttpResponse<any>> {
    return this.http.get('services/microserviceppm/api/import-budget', { observe: 'response' })
  }

  verifierLigneMax(ligneBudgetaire: ILigneBudgetaire): Observable<HttpResponse<number>> {
    // const options = createRequestOption({idAnnee});
    return this.http.put<number>(this.resourceUrl + '/verifier-ligne-max', ligneBudgetaire, {observe: 'response'});
  }

}

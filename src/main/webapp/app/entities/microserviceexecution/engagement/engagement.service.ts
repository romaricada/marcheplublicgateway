import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import {IEngagement} from "app/shared/model/microserviceexecution/engagement.model";
import {IBesoinLigneBudgetaire} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";

type EntityResponseType = HttpResponse<IEngagement>;
type EntityArrayResponseType = HttpResponse<IEngagement[]>;

@Injectable({ providedIn: 'root' })
export class EngagementService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/engagements';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceexecution/api/engagements/engagement-besoin-ligne-budget';

  constructor(protected http: HttpClient) {}

  create(engagement: IEngagement): Observable<EntityResponseType> {
    return this.http.post<IEngagement>(this.resourceUrl, engagement, { observe: 'response' })
  }

  update(engagement: IEngagement): Observable<IEngagement> {
    return this.http.put<IEngagement>(this.resourceUrl, engagement);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEngagement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEngagement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findEngagementByBesoinLigneBudget(activiteId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption(activiteId);
    return this.http.get<IEngagement[]>(this.resourceUrl1, {params: options, observe: 'response'});
  }

  findAllEngagement(activiteId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption(activiteId);
    return this.http.get<IEngagement[]>(this.resourceUrl + '/findAllEngagement', {params: options, observe: 'response'});
  }

  findAllByAvisDac(avisDacId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({avisDacId});
    return this.http.get<IEngagement[]>(this.resourceUrl + '/find-all-by-avis-dac', {params: options, observe: 'response'});
  }

  findAllByliggneBudgetaire(ligneBudgetaireId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({ligneBudgetaireId});
    return this.http.get<IEngagement[]>(this.resourceUrl + '/find-all-by-avis-dac', {params: options, observe: 'response'});
  }

  findAllBycontrat(contratId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({contratId});
    return this.http.get<IEngagement[]>(this.resourceUrl + '/find-all-by-contrat', {params: options, observe: 'response'});
  }

 montantAReporter(activiteId: number): Observable<HttpResponse<number>> {
   const options = createRequestOption({activiteId});
   return this.http.get<number>(this.resourceUrl + '/montant-a-reporter', {params: options, observe: 'response'});
 }

 montantEngager(blb?: IBesoinLigneBudgetaire, e?: IEngagement): Observable<HttpResponse<number>> {
   // const options = createRequestOption({blb, e});
   return this.http.get<number>(this.resourceUrl + '/difference-montant?/blb=' + blb + '&e=' + e, {observe: 'response'});
 }

 montantEngager2(blb?: number, e?: number): Observable<HttpResponse<number>> {
    window.console.log("#############################");
   const options = createRequestOption({blb, e});
   return this.http.get<number>(this.resourceUrl + '/difference-montant-2', {params: options ,observe: 'response'});
 }

  saveList(engagements: IEngagement[]): Observable<HttpResponse<boolean>> {
    return this.http.put<boolean>(this.resourceUrl + '/save-list', engagements, {observe: 'response'});
  }

}

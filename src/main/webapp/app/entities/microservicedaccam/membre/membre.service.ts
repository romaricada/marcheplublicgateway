import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMembre } from 'app/shared/model/microservicedaccam/membre.model';
type EntityResponseType = HttpResponse<IMembre>;
type EntityArrayResponseType = HttpResponse<IMembre[]>;

@Injectable({ providedIn: 'root' })
export class MembreService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/membres';

  constructor(protected http: HttpClient) {}

  create(membre: IMembre): Observable<EntityResponseType> {
    return this.http.post<IMembre>(this.resourceUrl, membre, { observe: 'response' });
  }

  update(membre: IMembre): Observable<EntityResponseType> {
    return this.http.put<IMembre>(this.resourceUrl, membre, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMembre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMembre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IMembre[]>(this.resourceUrl + '/find-all', {observe: 'response'});
  }
  deleteAll(membre: IMembre[]): Observable<EntityArrayResponseType> {
    return this.http.put<IMembre[]>(this.resourceUrl +'/updateListe', membre, { observe: 'response' });

  }
  findMembreByUnite(uniteId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({uniteId});
    return this.http.get<IMembre[]>(this.resourceUrl + '/membre-by-type', {params: options, observe:'response'});
  }

  findMembreByTypeCommission(typeCommissionId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({typeCommissionId});
    return this.http.get<IMembre[]>(this.resourceUrl + '/membre-by-type-commission', {params: options, observe:'response'});
  }
}

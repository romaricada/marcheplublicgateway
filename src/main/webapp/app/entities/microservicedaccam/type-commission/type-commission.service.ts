import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITypeCommission } from 'app/shared/model/microservicedaccam/type-commission.model';

type EntityResponseType = HttpResponse<ITypeCommission>;
type EntityArrayResponseType = HttpResponse<ITypeCommission[]>;

@Injectable({ providedIn: 'root' })
export class TypeCommissionService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/type-commissions';
  public resourceUrlAll = SERVER_API_URL + 'services/microservicedaccam/api/type-commissions/update-all';

  constructor(protected http: HttpClient) {}

  create(typeCommission: ITypeCommission): Observable<EntityResponseType> {
    return this.http.post<ITypeCommission>(this.resourceUrl, typeCommission, { observe: 'response' });
  }

  update(typeCommission: ITypeCommission): Observable<EntityResponseType> {
    return this.http.put<ITypeCommission>(this.resourceUrl, typeCommission, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeCommission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeCommission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ITypeCommission[]>(this.resourceUrl + '/find-all', {observe: 'response'});
  }

  findAllTypeCommisWithoutPage(): Observable<EntityArrayResponseType> {
    return this.http.get<ITypeCommission[]>(this.resourceUrl+'/find-all', {observe: 'response'});
  }

  findAllTypeCommisByAvisDac(avisDacId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({avisDacId});
    return this.http.get<ITypeCommission[]>(this.resourceUrl+'/all-by-avis-dac', {params: options, observe: 'response'});
  }

  updateAll(typeSelect: ITypeCommission[]): Observable<HttpResponse<ITypeCommission[]>> {
    return this.http.put<ITypeCommission[]>(this.resourceUrlAll, typeSelect, {observe: 'response' });

  }
}

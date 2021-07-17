import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICandidat } from 'app/shared/model/microservicedaccam/candidat.model';

type EntityResponseType = HttpResponse<ICandidat>;
type EntityArrayResponseType = HttpResponse<ICandidat[]>;

@Injectable({ providedIn: 'root' })
export class CandidatService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/candidats';
  public resourceUrl1 = SERVER_API_URL + 'services/microservicedaccam/api/candidats/avidac';

  constructor(protected http: HttpClient) {}

  create(candidat: ICandidat): Observable<EntityResponseType> {
    return this.http.post<ICandidat>(this.resourceUrl, candidat, { observe: 'response' });
  }

  update(candidat: ICandidat): Observable<EntityResponseType> {
    return this.http.put<ICandidat>(this.resourceUrl, candidat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICandidat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllCandidat(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidat[]>(this.resourceUrl+'/all', { params: options, observe: 'response' });
  }

  findAllByAvisDac(avisDacId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({avisDacId});
    return this.http.get<ICandidat[]>(this.resourceUrl+'/all-by-avis-dac', { params: options, observe: 'response' });
  }

 /* findAllCandidat(activiteId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({activiteId});
    return this.http.get<ICandidat[]>(this.resourceUrl+'/all-with-lot', { params: options, observe: 'response' });
  } */

  query(activiteId: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICandidat[]>(this.resourceUrl + '?activiteId=' + activiteId, { params: options, observe: 'response' });
  }

  findAllByAvisDacId(avisdacId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({avisdacId});
    return this.http
      .get<ICandidat[]>(this.resourceUrl + '/all-show-by-avis-dac',  { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEtape } from 'app/shared/model/microserviceppm/etape.model';

type EntityResponseType = HttpResponse<IEtape>;
type EntityArrayResponseType = HttpResponse<IEtape[]>;

@Injectable({ providedIn: 'root' })
export class EtapeService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/etapes';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceppm/api/etape/updateListe';

  constructor(protected http: HttpClient) {}

  create(etape: IEtape): Observable<EntityResponseType> {
    return this.http.post<IEtape>(this.resourceUrl, etape, { observe: 'response' });
  }

  update(etape: IEtape): Observable<EntityResponseType> {
    return this.http.put<IEtape>(this.resourceUrl, etape, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEtape>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEtape[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteAll(etape: IEtape[]): Observable<EntityArrayResponseType> {
    return this.http.put<IEtape[]>(this.resourceUrl1, etape, { observe: 'response' });
  }

  /* findEyapeByModePassation(modePassationId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption(modePassationId);
    return this.http.get<IEtape[]>(this.resourceUrl + '/find-mode', { params: options, observe: 'response' });
  } */
}

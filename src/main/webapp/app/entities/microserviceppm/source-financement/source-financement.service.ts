import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISourceFinancement } from 'app/shared/model/microserviceppm/source-financement.model';

type EntityResponseType = HttpResponse<ISourceFinancement>;
type EntityArrayResponseType = HttpResponse<ISourceFinancement[]>;

@Injectable({ providedIn: 'root' })
export class SourceFinancementService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/source-financements';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceppm/api//source-financements/updateListe';

  constructor(protected http: HttpClient) {}

  create(sourceFinancement: ISourceFinancement): Observable<EntityResponseType> {
    return this.http.post<ISourceFinancement>(this.resourceUrl, sourceFinancement, { observe: 'response' });
  }

  update(sourceFinancement: ISourceFinancement): Observable<EntityResponseType> {
    return this.http.put<ISourceFinancement>(this.resourceUrl, sourceFinancement, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISourceFinancement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISourceFinancement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteAll(sourceFinancement: ISourceFinancement[]): Observable<EntityArrayResponseType> {
    return this.http.put<ISourceFinancement[]>(this.resourceUrl1, sourceFinancement, { observe: 'response' });
  }

  findAllSourceFinancement(): Observable<EntityArrayResponseType> {
    return this.http.get<ISourceFinancement[]>(this.resourceUrl +'/findAll-by', { observe: 'response' });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContentieux } from 'app/shared/model/microserviceexecution/contentieux.model';

type EntityResponseType = HttpResponse<IContentieux>;
type EntityArrayResponseType = HttpResponse<IContentieux[]>;

@Injectable({ providedIn: 'root' })
export class ContentieuxService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/contentieuxes';

  constructor(protected http: HttpClient) {}

  create(contentieux: IContentieux): Observable<EntityResponseType> {
    return this.http.post<IContentieux>(this.resourceUrl, contentieux, { observe: 'response' });
  }

  update(contentieux: IContentieux): Observable<EntityResponseType> {
    return this.http.put<IContentieux>(this.resourceUrl, contentieux, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContentieux>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContentieux[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findContentieuxByContrat(contratId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({contratId});
    return this.http.get<IContentieux[]>(this.resourceUrl + '/contentieux-by-contrat', {params: options, observe: 'response'});
  }
}

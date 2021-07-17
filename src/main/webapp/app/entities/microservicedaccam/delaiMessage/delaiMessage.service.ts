import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDelaiMessage } from 'app/shared/model/microservicedaccam/delaiMessage.model';

type EntityResponseType = HttpResponse<IDelaiMessage>;
type EntityArrayResponseType = HttpResponse<IDelaiMessage[]>;

@Injectable({ providedIn: 'root' })
export class DelaiMessageService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/delai-messages';

  constructor(protected http: HttpClient) {}

  create(delaiMessage: IDelaiMessage): Observable<EntityResponseType> {
    return this.http.post<IDelaiMessage>(this.resourceUrl, delaiMessage, { observe: 'response' });
  }

  update(delaiMessage: IDelaiMessage): Observable<EntityResponseType> {
    return this.http.put<IDelaiMessage>(this.resourceUrl, delaiMessage, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDelaiMessage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDelaiMessage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findType(): Observable<EntityArrayResponseType> {

    return this.http.get<IDelaiMessage[]>(this.resourceUrl + '/type', { observe: 'response' });
  }

  findMessage(): Observable<EntityArrayResponseType> {

    return this.http.get<IDelaiMessage[]>(this.resourceUrl + '/message', { observe: 'response' });
  }
}

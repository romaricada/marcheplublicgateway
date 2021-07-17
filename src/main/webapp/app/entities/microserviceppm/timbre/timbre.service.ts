import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITimbre } from 'app/shared/model/microserviceppm/timbre.model';

type EntityResponseType = HttpResponse<ITimbre>;
type EntityArrayResponseType = HttpResponse<ITimbre[]>;

@Injectable({ providedIn: 'root' })
export class TimbreService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/timbres';

  constructor(protected http: HttpClient) {}

  create(timbre: ITimbre): Observable<EntityResponseType> {
    return this.http.post<ITimbre>(this.resourceUrl +'/save', timbre, { observe: 'response' });
  }

  update(timbre: ITimbre): Observable<EntityResponseType> {
    return this.http.put<ITimbre>(this.resourceUrl, timbre, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITimbre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITimbre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

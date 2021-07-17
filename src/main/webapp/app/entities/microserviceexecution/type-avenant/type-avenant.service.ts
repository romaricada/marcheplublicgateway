import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITypeAvenant } from 'app/shared/model/microserviceexecution/type-avenant.model';

type EntityResponseType = HttpResponse<ITypeAvenant>;
type EntityArrayResponseType = HttpResponse<ITypeAvenant[]>;

@Injectable({ providedIn: 'root' })
export class TypeAvenantService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/type-avenants';

  constructor(protected http: HttpClient) {}

  create(typeAvenant: ITypeAvenant): Observable<EntityResponseType> {
    return this.http.post<ITypeAvenant>(this.resourceUrl, typeAvenant, { observe: 'response' });
  }

  update(typeAvenant: ITypeAvenant): Observable<EntityResponseType> {
    return this.http.put<ITypeAvenant>(this.resourceUrl, typeAvenant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeAvenant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeAvenant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITypeEntrepot } from 'app/shared/model/microserviceged/type-entrepot.model';

type EntityResponseType = HttpResponse<ITypeEntrepot>;
type EntityArrayResponseType = HttpResponse<ITypeEntrepot[]>;

@Injectable({ providedIn: 'root' })
export class TypeEntrepotService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceged/api/type-entrepots';
  public resourceUrlF = SERVER_API_URL + 'services/microserviceged/api/type-entrepots/find-type-entrepotFils';

  constructor(protected http: HttpClient) {}

  create(typeEntrepot: ITypeEntrepot): Observable<EntityResponseType> {
    return this.http.post<ITypeEntrepot>(this.resourceUrl, typeEntrepot, { observe: 'response' });
  }

  update(typeEntrepot: ITypeEntrepot): Observable<EntityResponseType> {
    return this.http.put<ITypeEntrepot>(this.resourceUrl, typeEntrepot, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeEntrepot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeEntrepot[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }


  findTypeEntrepotFils(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeEntrepot>(this.resourceUrlF, { params: createRequestOption({id}), observe: 'response'});
  }
}

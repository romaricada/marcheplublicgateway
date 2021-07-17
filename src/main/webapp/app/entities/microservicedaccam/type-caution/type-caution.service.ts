import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {ITypeCaution} from 'app/shared/model/microservicedaccam/typeCaution.model';

type EntityResponseType = HttpResponse<ITypeCaution>;
type EntityArrayResponseType = HttpResponse<ITypeCaution[]>;

@Injectable({providedIn: 'root'})
export class TypeCautionService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/type-cautions';

  constructor(protected http: HttpClient) {
  }

  create(typeCaution: ITypeCaution): Observable<EntityResponseType> {
    return this.http.post<ITypeCaution>(this.resourceUrl, typeCaution, {observe: 'response'});
  }

  update(typeCaution: ITypeCaution): Observable<EntityResponseType> {
    return this.http.put<ITypeCaution>(this.resourceUrl, typeCaution, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeCaution>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeCaution[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAvenant } from 'app/shared/model/microserviceexecution/avenant.model';

type EntityResponseType = HttpResponse<IAvenant>;
type EntityArrayResponseType = HttpResponse<IAvenant[]>;

@Injectable({ providedIn: 'root' })
export class AvenantService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/avenants';

  constructor(protected http: HttpClient) {}

  create(avenant: IAvenant): Observable<EntityResponseType> {
    return this.http.post<IAvenant>(this.resourceUrl, avenant, { observe: 'response' });
  }

  update(avenant: IAvenant): Observable<EntityResponseType> {
    return this.http.put<IAvenant>(this.resourceUrl, avenant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAvenant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAvenant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAvenantByContrat(contratId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({contratId});
    return this.http.get<IAvenant[]>(this.resourceUrl + '/avenant-by-contrat', {params: options, observe:'response'});
  }

}

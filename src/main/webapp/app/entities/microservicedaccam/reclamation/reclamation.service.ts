import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReclamation } from 'app/shared/model/microservicedaccam/reclamation.model';

type EntityResponseType = HttpResponse<IReclamation>;
type EntityArrayResponseType = HttpResponse<IReclamation[]>;

@Injectable({ providedIn: 'root' })
export class ReclamationService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/reclamations';
  public resourceUrl1 = SERVER_API_URL + 'services/microservicedaccam/api/reclamations/updateListe';

  constructor(protected http: HttpClient) {}

  create(reclamation: IReclamation): Observable<EntityResponseType> {
    return this.http
      .post<IReclamation>(this.resourceUrl, reclamation, { observe: 'response' });
  }

  update(reclamation: IReclamation): Observable<EntityResponseType> {
    return this.http.put<IReclamation>(this.resourceUrl, reclamation, { observe: 'response' });
  }

  /* update(reclamation: IReclamation): Observable<EntityResponseType> {
    return this.http
      .put<IReclamation>(this.resourceUrl1, reclamation, { observe: 'response' });
  }*/

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReclamation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReclamation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }


   findReclamationByLot(lotId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<IReclamation[]>(this.resourceUrl + '/all-by-lot', {params: options, observe: 'response'});
  }
  findReclamationByAvisDac(avisDacId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({avisDacId});
    return this.http.get<IReclamation[]>(this.resourceUrl + '/all-by-avis-dac', {params: options, observe: 'response'});
  }
}

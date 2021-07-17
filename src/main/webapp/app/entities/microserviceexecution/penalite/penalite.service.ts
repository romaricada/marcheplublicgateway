import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPenalite } from 'app/shared/model/microserviceexecution/penalite.model';

type EntityResponseType = HttpResponse<IPenalite>;
type EntityArrayResponseType = HttpResponse<IPenalite[]>;

@Injectable({ providedIn: 'root' })
export class PenaliteService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/penalites';

  constructor(protected http: HttpClient) {}

  create(penalite: IPenalite): Observable<EntityResponseType> {
    return this.http.post<IPenalite>(this.resourceUrl, penalite, { observe: 'response' });
  }

  update(penalite: IPenalite): Observable<EntityResponseType> {
    return this.http.put<IPenalite>(this.resourceUrl, penalite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPenalite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPenalite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findPenaliteByContrat(contratId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({contratId});
    return this.http.get<IPenalite[]>(this.resourceUrl + '/penalite-by-contrat', {params: options, observe: 'response'});
  }

  findPenaliteByLiquidation(liquidationId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({liquidationId});
    return this.http.get<IPenalite[]>(this.resourceUrl + '/penalite-by-liquidation', {params: options, observe: 'response'});
  }
}

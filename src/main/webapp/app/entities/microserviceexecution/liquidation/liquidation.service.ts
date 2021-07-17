import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILiquidation } from 'app/shared/model/microserviceexecution/liquidation.model';

type EntityResponseType = HttpResponse<ILiquidation>;
type EntityArrayResponseType = HttpResponse<ILiquidation[]>;

@Injectable({ providedIn: 'root' })
export class LiquidationService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/liquidations';

  constructor(protected http: HttpClient) {}

  create(liquidation: ILiquidation): Observable<EntityResponseType> {
    return this.http.post<ILiquidation>(this.resourceUrl, liquidation, { observe: 'response' });
  }

  update(liquidation: ILiquidation): Observable<EntityResponseType> {
    return this.http.put<ILiquidation>(this.resourceUrl, liquidation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILiquidation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILiquidation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findLiquidationByContrat(contratId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({contratId});
    return this.http.get<ILiquidation[]>(this.resourceUrl + '/liquidation-by-contrat', {params: options, observe: 'response'});
  }

  findLiquidationByEngagement(engagementId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({engagementId});
    return this.http.get<ILiquidation[]>(this.resourceUrl + '/liquidation-by-engagement', {params: options, observe: 'response'});
  }

  deleteAll(liquidations: ILiquidation[]): Observable<EntityArrayResponseType> {
    return this.http.put<ILiquidation[]>(this.resourceUrl + '/deleteALL', liquidations, {observe: 'response'});
  }
}

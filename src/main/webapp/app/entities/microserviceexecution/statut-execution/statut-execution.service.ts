import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStatutExecution } from 'app/shared/model/microserviceexecution/statut-execution.model';

type EntityResponseType = HttpResponse<IStatutExecution>;
type EntityArrayResponseType = HttpResponse<IStatutExecution[]>;

@Injectable({ providedIn: 'root' })
export class StatutExecutionService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/statut-executions';

  constructor(protected http: HttpClient) {}

  create(statutExecution: IStatutExecution): Observable<EntityResponseType> {
    return this.http.post<IStatutExecution>(this.resourceUrl, statutExecution, { observe: 'response' });
  }

  update(statutExecution: IStatutExecution): Observable<EntityResponseType> {
    return this.http.put<IStatutExecution>(this.resourceUrl, statutExecution, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStatutExecution>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStatutExecution[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findStatusExecutionByContrat(contratId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({contratId});
    return this.http.get<IStatutExecution[]>(this.resourceUrl + '/statut-by-contrat', {params: options, observe: 'response'});
  }
  changeStatus(statutExecution: IStatutExecution): Observable<EntityResponseType> {
    return this.http.put<IStatutExecution>(this.resourceUrl + '/active-marche-resilier', statutExecution, {observe: 'response'});
  }
}

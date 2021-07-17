import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEtapeExecution } from 'app/shared/model/microserviceexecution/etape-execution.model';

type EntityResponseType = HttpResponse<IEtapeExecution>;
type EntityArrayResponseType = HttpResponse<IEtapeExecution[]>;

@Injectable({ providedIn: 'root' })
export class EtapeExecutionService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/etape-executions';

  constructor(protected http: HttpClient) {}

  create(etapeExecution: IEtapeExecution): Observable<EntityResponseType> {
    return this.http.post<IEtapeExecution>(this.resourceUrl, etapeExecution, { observe: 'response' });
  }

  update(etapeExecution: IEtapeExecution): Observable<EntityResponseType> {
    return this.http.put<IEtapeExecution>(this.resourceUrl, etapeExecution, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEtapeExecution>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEtapeExecution[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

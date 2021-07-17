import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import {
  IInstitutionFinanciere,
  InstitutionFinanciere
} from 'app/shared/model/microservicedaccam/institutionFinanciere.model';

type EntityResponseType = HttpResponse<IInstitutionFinanciere>;
type EntityArrayResponseType = HttpResponse<IInstitutionFinanciere[]>;

@Injectable({ providedIn: 'root' })
export class InstitutionFinanciereService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/institution-financieres';

  constructor(protected http: HttpClient) {}

  create(institutionFinanciere: IInstitutionFinanciere): Observable<EntityResponseType> {
    return this.http.post<IInstitutionFinanciere>(this.resourceUrl, institutionFinanciere, { observe: 'response' });
  }

  update(institutionFinanciere: IInstitutionFinanciere): Observable<EntityResponseType> {
    return this.http.put<IInstitutionFinanciere>(this.resourceUrl, institutionFinanciere, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstitutionFinanciere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
/*
  /!* query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidat[]>(this.resourceUrl, { params: options, observe: 'response' });
  } *!/

  findAllByActivite(activiteId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({activiteId});
    return this.http.get<ICandidat[]>(this.resourceUrl+'/all-by-activite', { params: options, observe: 'response' });
  }

 /!* findAllCandidat(activiteId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({activiteId});
    return this.http.get<ICandidat[]>(this.resourceUrl+'/all-with-lot', { params: options, observe: 'response' });
  } *!/

  query(activiteId: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICandidat[]>(this.resourceUrl + '?activiteId=' + activiteId, { params: options, observe: 'response' });
  }*/

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitutionFinanciere[]>(this.resourceUrl, {params: options, observe: 'response'});
  }


  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllInstitutions(): Observable<EntityArrayResponseType> {
    return this.http.get<InstitutionFinanciere[]>(this.resourceUrl + '/institutionFinancieres', { observe: 'response'});
  }

}

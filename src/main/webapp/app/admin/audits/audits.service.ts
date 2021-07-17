import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared/util/request-util';
import { SERVER_API_URL } from 'app/app.constants';
import { Audit } from './audit.model';



@Injectable({ providedIn: 'root' })
export class AuditsService {
  constructor(private http: HttpClient) {}
  query(req: any): Observable<HttpResponse<Audit[]>> {
    const params: HttpParams = createRequestOption(req);
    params.set('fromDate', req.fromDate);
    params.set('toDate', req.toDate);

    const requestURL = SERVER_API_URL + 'management/audits';

    return this.http.get<Audit[]>(requestURL, {
      params,
      observe: 'response'
    });
  }
  /* findUser(login: string): Observable<HttpResponse<Audit[]>> {
    const requestURL = SERVER_API_URL + 'management/audits/find-login';
    return this.http.get<Audit[]>(requestURL, {
      params: createRequestOption({login}),
      observe: 'response'
    });
  } */
  findByUser(principal: string): Observable<HttpResponse<Audit[]>> {
    const requestURL = SERVER_API_URL + 'management/audits/find-principal';
    return this.http.get<Audit[]>(requestURL, {
      params: createRequestOption({principal}),
      observe: 'response'
    });
  }

  /* findBydistinctUser(): Observable<HttpResponse<Audit[]>> {
     const requestURL = SERVER_API_URL + 'management/audits/find-principal-distinct';
     return this.http.get<Audit[]>(requestURL, {
       observe: 'response'
     });
   } */

  findBystatus(type: string): Observable<HttpResponse<Audit[]>> {
    const requestURL = SERVER_API_URL + 'management/audits/find-type';
    return this.http.get<Audit[]>(requestURL, {
      params: createRequestOption({type}),
      observe: 'response'
    });
  }
}

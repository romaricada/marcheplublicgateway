import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class NabBarService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/alerte-notifications';

  constructor(protected http: HttpClient) {}

  getCurentTaskCount(): Observable<HttpResponse<number[]>> {
    return this.http.get<number[]>(this.resourceUrl + '/curent-task', { observe: 'response' });
  }

  getCurentUser(account: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(SERVER_API_URL + 'services/microserviceppm/api/mails/send', account, { observe: 'response' });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAccount } from 'app/core/user/account.model';

import {User} from "app/core/user/user.model";


@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + 'api/users';

  constructor(private http: HttpClient) {}

  create(user: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>(this.resourceUrl, user);
  }

  update(user: IAccount): Observable<IAccount> {
    return this.http.put<IAccount>(this.resourceUrl, user);
  }

  find(login: string): Observable<IAccount> {
    return this.http.get<IAccount>(`${this.resourceUrl}/${login}`);
  }

  query(req?: any): Observable<HttpResponse<IAccount[]>> {
    const options = createRequestOption(req);
    return this.http.get<IAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${login}`);
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
  }

  getAllAuthorities(): Observable<any[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/authorities/users');
  }
  getAllUsers(): Observable<HttpResponse<User[]>> {
    const requestURL = SERVER_API_URL + 'api/users/all-users';
    return this.http.get<User[]>(requestURL, {
      observe: 'response'
    });
  }
}

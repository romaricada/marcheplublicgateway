import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocale } from 'app/shared/model/microserviceged/locale.model';

type EntityResponseType = HttpResponse<ILocale>;
type EntityArrayResponseType = HttpResponse<ILocale[]>;

@Injectable({ providedIn: 'root' })
export class LocaleService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceged/api/locales';

  constructor(protected http: HttpClient) {}

  create(locale: ILocale): Observable<EntityResponseType> {
    return this.http.post<ILocale>(this.resourceUrl, locale, { observe: 'response' });
  }

  update(locale: ILocale): Observable<EntityResponseType> {
    return this.http.put<ILocale>(this.resourceUrl, locale, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocale>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocale[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars


import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPpmActivite } from 'app/shared/model/microserviceppm/ppm-activite.model';

type EntityResponseType = HttpResponse<IPpmActivite>;
type EntityArrayResponseType = HttpResponse<IPpmActivite[]>;

@Injectable({ providedIn: 'root' })
export class PpmActiviteService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/ppm-activites';

  constructor(protected http: HttpClient) {}

  create(ppmActivite: IPpmActivite): Observable<EntityResponseType> {
    return this.http
      .post<IPpmActivite>(this.resourceUrl, ppmActivite, { observe: 'response' });
  }

  update(ppmActivite: IPpmActivite): Observable<EntityResponseType> {
    return this.http
      .put<IPpmActivite>(this.resourceUrl, ppmActivite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPpmActivite>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPpmActivite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import {IAvisDac} from 'app/shared/model/microservicedaccam/avis-dac.model';
import {createRequestOption} from 'app/shared/util/request-util';
type EntityResponseType = HttpResponse<IAvisDac>;
type EntityArrayResponseType = HttpResponse<IAvisDac[]>;

@Injectable({ providedIn: 'root' })
export class AvisDacService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/avis-dacs';
  public resourceUrl1 = SERVER_API_URL + 'services/microservicedaccam/api/avis-dacs/updateListe';

  constructor(protected http: HttpClient) {}

  create(avisDac: IAvisDac): Observable<EntityResponseType> {
    return this.http.post<IAvisDac>(this.resourceUrl, avisDac, { observe: 'response' });
  }

  update(avisDac: IAvisDac): Observable<EntityResponseType> {
    return this.http.put<IAvisDac>(this.resourceUrl, avisDac, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAvisDac>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(activiteId): Observable<EntityArrayResponseType> {
    const param = createRequestOption({activiteId});
    return this.http.get<IAvisDac[]>(this.resourceUrl, {params: param, observe: 'response'});
  }

  findListAvisDacByExercice(exerciceId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({exerciceId});
    return this.http.get<IAvisDac[]>(this.resourceUrl + '/all-by-exercice', {params: options, observe: 'response'});
  }

  deleteAll(avisDac: IAvisDac[]): Observable<EntityArrayResponseType> {
    return this.http.put<IAvisDac[]>(this.resourceUrl1, avisDac, { observe: 'response' });
  }

}

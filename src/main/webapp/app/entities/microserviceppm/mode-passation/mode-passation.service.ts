import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IModePassation } from 'app/shared/model/microserviceppm/mode-passation.model';

type EntityResponseType = HttpResponse<IModePassation>;
type EntityArrayResponseType = HttpResponse<IModePassation[]>;

@Injectable({ providedIn: 'root' })
export class ModePassationService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/mode-passations';

  public resourceUrl2 = SERVER_API_URL + 'services/microserviceppm/api/mode-passations/updateListe';

  constructor(protected http: HttpClient) {}

  create(modePassation: IModePassation): Observable<EntityResponseType> {
    return this.http.post<IModePassation>(this.resourceUrl, modePassation, { observe: 'response' });
  }

  update(modePassation: IModePassation): Observable<EntityResponseType> {
    return this.http.put<IModePassation>(this.resourceUrl, modePassation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IModePassation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IModePassation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteAll(modePassation: IModePassation[]): Observable<EntityArrayResponseType> {
    return this.http.put<IModePassation[]>(this.resourceUrl2, modePassation, { observe: 'response' });
  }


  findAllByModePassation(): Observable<EntityArrayResponseType> {
    return this.http.get<IModePassation[]>(this.resourceUrl + '/find-all', {observe: 'response'});
  }
}

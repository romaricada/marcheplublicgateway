import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITypeArchive } from 'app/shared/model/microserviceged/type-archive.model';

type EntityResponseType = HttpResponse<ITypeArchive>;
type EntityArrayResponseType = HttpResponse<ITypeArchive[]>;

@Injectable({ providedIn: 'root' })
export class TypeArchiveService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceged/api/type-archives';

  constructor(protected http: HttpClient) {}

  create(typeArchive: ITypeArchive): Observable<EntityResponseType> {
    return this.http.post<ITypeArchive>(this.resourceUrl, typeArchive, { observe: 'response' });
  }

  update(typeArchive: ITypeArchive): Observable<EntityResponseType> {
    return this.http.put<ITypeArchive>(this.resourceUrl, typeArchive, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeArchive>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeArchive[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

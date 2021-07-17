import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';
import { IOrdreService } from 'app/shared/model/microserviceexecution/ordre-service.model';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';


type EntityResponseType = HttpResponse<IOrdreService>;
type EntityArrayResponseType = HttpResponse<IOrdreService[]>;

@Injectable({ providedIn: 'root' })
export class OrdreDeServiceService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/ordre-services';

  constructor(protected http: HttpClient) {}

  create(ordre: IOrdreService): Observable<EntityResponseType> {
    return this.http.post<IOrdreService>(this.resourceUrl, ordre, {observe: 'response'})
}



update(ordreDeService: IOrdreService): Observable<EntityResponseType> {
    return this.http.put<IOrdreService>(this.resourceUrl, ordreDeService, {observe: 'response'});
}

find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrdreService>(`${this.resourceUrl}/${id}`, {observe: 'response'})
}

query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrdreService[]>(this.resourceUrl, {params: options, observe: 'response'});
}

delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
}

  findAllOrdreServiceByContrat(contratId : number) : Observable<EntityArrayResponseType> {
    const options = createRequestOption({contratId});
    return this.http.get<IOrdreService[]>( this.resourceUrl + '/ordreService-by-contrat', {params : options, observe : 'response'})
  }

  deleteAll(ordreDeService: IOrdreService[]): Observable<EntityArrayResponseType>{
    return this.http.put<IOrdreService[]>(this.resourceUrl + '/updateListe', ordreDeService, {observe: 'response'} )
  }

}

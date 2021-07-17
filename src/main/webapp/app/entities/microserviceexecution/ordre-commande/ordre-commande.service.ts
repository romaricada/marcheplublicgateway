import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import {IOrdreCommande} from "app/shared/model/microserviceexecution/ordre-commande.model";

type EntityResponseType = HttpResponse<IOrdreCommande>;
type EntityArrayResponseType = HttpResponse<IOrdreCommande[]>;

@Injectable({ providedIn: 'root' })
export class OrdreCommandeService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/ordre-commandes';

  constructor(protected http: HttpClient) {}

  create(ordrecommande: IOrdreCommande): Observable<EntityResponseType> {
    return this.http.post<IOrdreCommande>(this.resourceUrl, ordrecommande, { observe: 'response' });
  }

  update(ordrecommande: IOrdreCommande): Observable<EntityResponseType> {
    return this.http.put<IOrdreCommande>(this.resourceUrl, ordrecommande, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrdreCommande>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrdreCommande[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllbyContrat(contratId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({contratId});
    return this.http.get<IOrdreCommande[]>(this.resourceUrl + '/findAll-by-contrat', {params: options, observe:'response'});

  }

  deleteAll(ordreCommande: IOrdreCommande[]): Observable<EntityArrayResponseType> {
    return this.http.put<IOrdreCommande[]>(this.resourceUrl + '/deleteALL', ordreCommande, {observe: 'response'});
  }
}

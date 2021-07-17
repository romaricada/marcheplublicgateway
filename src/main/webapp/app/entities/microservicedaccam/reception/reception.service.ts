import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IReception} from 'app/shared/model/microservicedaccam/reception.model';
import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {ILot} from "app/shared/model/microservicedaccam/lot.model";


type EntityResponseType = HttpResponse<IReception>;
type EntityArrayResponseType = HttpResponse<IReception[]>;
type EntityArrayResponseType1 = HttpResponse<ILot[]>;

@Injectable({providedIn: 'root'})
export class ReceptionService {
    public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/receptions';
    constructor(protected http: HttpClient) {
    }

    create(reception: IReception): Observable<EntityResponseType> {
        return this.http
            .post<IReception>(this.resourceUrl, reception, {observe: 'response'})
    }

    update(reception: IReception): Observable<EntityResponseType> {
        return this.http
            .put<IReception>(this.resourceUrl, reception, {observe: 'response'})
    }

 /* findReceptionByActivite(activiteId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({activiteId});
    return this.http.get<IReception[]>(this.resourceUrl + '/reception-by-activite', {params: options, observe: 'response'});
  }
  findReceptionByNumeroDac(exerciceId: number,avisDacId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({exerciceId,avisDacId});
    return this.http.get<IReception[]>(this.resourceUrl + '/all-by-AVISDACAndExercice', {params: options, observe: 'response'});
  }*/

  findReceptionByAvisDac(avisDacId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({avisDacId});
    window.console.log('-------------->' + typeof(options));
    return this.http.get<IReception[]>(this.resourceUrl + '/all-by-avis-dac', {params: options, observe: 'response'});
  }

  findReceptionByExercice(exerciceId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({exerciceId});
    return this.http.get<IReception[]>(this.resourceUrl + '/all-by-Exercice', {params: options, observe: 'response'});
  }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReception[]>(this.resourceUrl, {params: options, observe: 'response'})
    }

 findListAvisDacByExercice(exerciceId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({exerciceId});
    return this.http.get<IAvisDac[]>(this.resourceUrl + '/all-by-exercice', {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  deleteAll(reception: IReception[]): Observable<EntityArrayResponseType> {
    return this.http.put<IReception[]>(this.resourceUrl +'/updateListe', reception, {observe: 'response'});
  }

 /* findReceptionByLot(lotId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<IReception[]>(this.resourceUrl + '/all-by-lot', {params: options, observe: 'response'});
  }

  filterLotByAvisDac(avisDacId : number): Observable<EntityArrayResponseType1> {
      const options = createRequestOption({avisDacId});
      return this.http.get<ILot[]>(this.resourceUrl + '/filter-by-lot', {params:options, observe: 'response'} );
  }

  filterByLotId(lotId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<IReception[]>(this.resourceUrl + '/filter-by-lot-avisDac', {params: options, observe: 'response'});
  }*/




}

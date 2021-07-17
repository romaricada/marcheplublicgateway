import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IContrat} from 'app/shared/model/microserviceexecution/contrat.model';
import {IStatutExecution} from "app/shared/model/microserviceexecution/statut-execution.model";


type EntityResponseType = HttpResponse<IContrat>;
type EntityArrayResponseType = HttpResponse<IContrat[]>;

@Injectable({providedIn: 'root'})
export class ContratService {
    public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/contrats';

    constructor(protected http: HttpClient) {
    }

    create(contrat: IContrat): Observable<EntityResponseType> {
        return this.http.post<IContrat>(this.resourceUrl, contrat, {observe: 'response'})
    }

    saveAll(contrat: IContrat): Observable<EntityResponseType> {
        return this.http.post<IContrat>(this.resourceUrl + '/saveAll-Lot', contrat, {observe: 'response'})
    }

    saveAllContrat(contrat: IContrat): Observable<EntityResponseType> {
        return this.http.post<IContrat>(this.resourceUrl + '/saveAll-contrat', contrat, {observe: 'response'});


    }

    update(contrat: IContrat): Observable<EntityResponseType> {
        return this.http.put<IContrat>(this.resourceUrl, contrat, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContrat>(`${this.resourceUrl}/${id}`, {observe: 'response'})
    }
    findById(contratId: number): Observable<EntityResponseType> {
        return this.http.get<IContrat>(`${this.resourceUrl+'/by-id'}/${contratId}`, {observe: 'response'})
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContrat[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    /* findContratBycandidatLot(candidatLotId?: number): Observable<EntityResponseType> {
      const options = createRequestOption({candidatLotId});
      return this.http.get<IContrat>(this.resourceUrl + '/contrat-by-candidatLot', {params: options, observe: 'response'});
    }
    findContratListBycandidatLot(lotId?: number): Observable<EntityResponseType> {
      const options = createRequestOption({lotId});
      return this.http.get<IContrat>(this.resourceUrl + '/contrat-list', {params: options, observe: 'response'});
    }

    findCandidatByLot(lotId: number): Observable<EntityArrayResponseType> {
      const options = createRequestOption({lotId});
      return this.http.get<IContrat[]>(this.resourceUrl + '/contrat-by-lot', {params: options, observe: 'response'});
    } */

    changeStatus(statutExecution: IStatutExecution): Observable<EntityResponseType> {
        return this.http.put<IStatutExecution>(this.resourceUrl + '/active-marche-resilier', statutExecution, {observe: 'response'});
    }

    findAllContratByCandidat(avisDacId: number, candidatId: number): Observable<EntityArrayResponseType> {
        const options = createRequestOption({avisDacId, candidatId});
        return this.http.get<IContrat[]>(this.resourceUrl + '/contrat-by-Candidat', {
            params: options,
            observe: 'response'
        });
    }

    findAllContratByExerceId(exerciceId: number): Observable<EntityArrayResponseType> {
        const options = createRequestOption({exerciceId});
        return this.http.get<IContrat[]>(this.resourceUrl + '/contrat-by-exerciceId', {
            params: options,
            observe: 'response'
        });
    }

    findAllContratByAvisDac(avisDacId: number): Observable<HttpResponse<IContrat[]>> {
        const options = createRequestOption({avisDacId});
        return this.http.get<IContrat[]>(this.resourceUrl + '/contrat-by-avis_dac', {
            params: options,
            observe: 'response'
        });
    }


}

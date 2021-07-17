import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';


type EntityResponseType = HttpResponse<IExerciceBudgetaire>;
type EntityArrayResponseType = HttpResponse<IExerciceBudgetaire[]>;

@Injectable({providedIn: 'root'})
export class ExerciceBudgetaireService {
    public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/exercice-budgetaires';
    public resourceUrl1 = SERVER_API_URL + 'services/microserviceppm/api/exercicebudgetaire/updateListe';


    constructor(protected http: HttpClient) {
    }

    create(exerciceBudgetaire: IExerciceBudgetaire): Observable<EntityResponseType> {
        return this.http.post<IExerciceBudgetaire>(this.resourceUrl, exerciceBudgetaire, {observe: 'response'});
    }

    update(exerciceBudgetaire: IExerciceBudgetaire): Observable<EntityResponseType> {
        return this.http.put<IExerciceBudgetaire>(this.resourceUrl, exerciceBudgetaire, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IExerciceBudgetaire>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IExerciceBudgetaire[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    findAllWithoutPage(): Observable<EntityArrayResponseType> {
        return this.http.get<IExerciceBudgetaire[]>(this.resourceUrl + '/no-page', {observe: 'response'});
    }

    findCurrentExercice(): Observable<EntityResponseType> {
        return this.http.get<IExerciceBudgetaire>(this.resourceUrl + '/current-exercice', {observe: 'response'})
    }

    changeStatus(exerciciBudget: IExerciceBudgetaire): Observable<EntityResponseType> {
        return this.http
            .put<IExerciceBudgetaire>(this.resourceUrl + '/activate', exerciciBudget, {observe: 'response'});
    }

    changeElaborerPPM(exerciciBudget: IExerciceBudgetaire): Observable<EntityResponseType> {
        return this.http
            .put<IExerciceBudgetaire>(this.resourceUrl + '/elaborer-ppm', exerciciBudget, {observe: 'response'});
    }

    findCurrentExerciceByElaborerIsTrue(): Observable<EntityResponseType> {
        return this.http.get<IExerciceBudgetaire>(this.resourceUrl + '/current-exercice-elaborer', {observe: 'response'})
    }

    deleteAll(exercicibudget: IExerciceBudgetaire[]): Observable<EntityArrayResponseType> {
        return this.http.put<IExerciceBudgetaire[]>(this.resourceUrl1, exercicibudget, {observe: 'response'});
    }

    // store
    storeCurrentExercice(): Observable<IExerciceBudgetaire> {
        return this.http.get<IExerciceBudgetaire>(this.resourceUrl + '/current-exercice')
    }
}

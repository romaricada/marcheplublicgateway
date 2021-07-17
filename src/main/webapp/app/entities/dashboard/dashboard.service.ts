import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "app/app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "app/shared/util/request-util";

@Injectable({providedIn: 'root'})
export class DashboardService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/dashboard';

  constructor(protected http: HttpClient) {
  }

  getAccueilInfo(idExercice?: number): Observable<any> {
    const options = createRequestOption({idExercice});
    return this.http.get<any>(this.resourceUrl+ '/dashboard-acceuil', {params: options, observe: 'response'});
  }

  /* findListAvisDacByExercice(exerciceId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({exerciceId});
    return this.http.get<IAvisDac[]>(this.resourceUrl + '/all-by-exercice', {params: options, observe: 'response'});
  } */
}

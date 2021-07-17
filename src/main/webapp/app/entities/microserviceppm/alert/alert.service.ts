import { Injectable } from '@angular/core';
import {SERVER_API_URL} from "app/app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEtapeActivitePpm} from "app/shared/model/microserviceppm/etape-activite-ppm.model";
import {IUserNotification} from "app/shared/model/microserviceppm/user-notification.model";



@Injectable({ providedIn: 'root' })
export class AlertService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/alerte-notifications/all-not-visited';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceppm/api/jour-feriers/updateListe';

  constructor(protected http: HttpClient) {}

  getEtapesNotVisited(account: Account): Observable<HttpResponse<IEtapeActivitePpm[]>> {
    return this.http.put<IUserNotification[]>(this.resourceUrl, account, { observe: 'response'});
  }

}


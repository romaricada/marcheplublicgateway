import { Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {AlertComponent} from 'app/entities/microserviceppm/alert/alert.component';

/* @Injectable({ providedIn: 'root' })
export class AlerteResolve implements Resolve<string> {
  constructor(private service: AlertService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocale> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((locale: HttpResponse<Locale>) => locale.body));
    }
    return of(new Locale());
  }
} */

export const alertRoute: Routes = [
  {
    path: '',
    component: AlertComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Alert'
    },
    canActivate: [UserRouteAccessService]
  },
];

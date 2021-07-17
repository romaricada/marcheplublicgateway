import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Resolve, ActivatedRouteSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ITypeCaution, TypeCaution} from 'app/shared/model/microservicedaccam/typeCaution.model';
import {TypeCautionService} from 'app/entities/microservicedaccam/type-caution/type-caution.service';
import {TypeCautionComponent} from 'app/entities/microservicedaccam/type-caution/type-caution.component';

@Injectable({providedIn: 'root'})
export class TypeCautionResolve implements Resolve<ITypeCaution> {
  constructor(private service: TypeCautionService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeCaution> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((typeCaution: HttpResponse<TypeCaution>) => typeCaution.body));
    }
    return of(new TypeCaution());
  }
}

export const typeCautionRoute: Routes = [
  {
    path: '',
    component: TypeCautionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'type-caution'
    },
    canActivate: [UserRouteAccessService]
  },
];

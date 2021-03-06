import { HttpResponse } from '@angular/common/http';
import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { IAccount } from 'app/core/user/account.model';
import { UserService } from 'app/core/user/user.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {IUniteAdministrative} from "app/shared/model/microserviceppm/unite-administrative.model";
import {UniteAdministrativeService} from "app/entities/microserviceppm/unite-administrative/unite-administrative.service";
registerLocaleData(localeFr);

@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user-management.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
})
export class UserManagementComponent implements OnInit, OnDestroy {
  currentAccount: any;
  users: IAccount[];
  usersFilter: IAccount[];
  error: any;
  success: any;
  userListSubscription: Subscription;
  routeData: Subscription;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  uniteadministratives: IUniteAdministrative[] = [];
  uniteAd: IUniteAdministrative;

  constructor(
    private userService: UserService,
    private alertService: JhiAlertService,
    private accountService: AccountService,
    private parseLinks: JhiParseLinks,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventManager: JhiEventManager,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private uniadministrativeService: UniteAdministrativeService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadUniteAdmin() {
    this.uniadministrativeService.findAll()
      .subscribe((res: HttpResponse<IUniteAdministrative[]>) => {
        this.uniteadministratives = res.body;
      })
  }

  ngOnInit() {
    this.eventManager.broadcast({
      name: 'endpointChanged',
      content: 'User switch to portail !'
    });
    this.uniteAd = null;
    this.loadUniteAdmin();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
      this.loadAll();
      this.registerChangeInUsers();
    });
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
    if (this.userListSubscription) {
      this.eventManager.destroy(this.userListSubscription);
    }
  }

  registerChangeInUsers() {
    this.userListSubscription = this.eventManager.subscribe('userListModification', () => this.loadAll());
  }

  setActive(user, isActivated) {
    user.activated = isActivated;

    this.userService.update(user).subscribe(
      () => {
        this.error = null;
        this.success = 'OK';
        this.loadAll();
      },
      () => {
        this.success = null;
        this.error = 'ERROR';
      }
    );
  }

  loadAll() {
    this.userService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IAccount[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpResponse<any>) => this.onError(res.body)
      );
  }

  trackIdentity(index, item: IAccount) {
    return item.id;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  private onSuccess(data, headers) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = headers.get('X-Total-Count');
    this.users = data;
    this.usersFilter = data;
  }

  private onError(error) {
    this.alertService.error(error.error, error.message, null);
  }

  doSearch(event: any) {
    this.users = event;
  }

  deleteElement(user) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous s??r de vouloir vider les donn??es ?',
      accept: () => {
        if (!user.activated) {
          this.userService.delete(user.login).subscribe(() => {
            this.showMessage('success', 'SUPRESSION', 'Utilisateur suprimer avec succes');
            this.loadAll();
          });
        } else {
          this.showMessage('info', 'SUPRESSION', 'Suppression echou?? utilisateur toujours actif');
        }
      }
    });
  }

  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  findUniteById(id: number): string {
    let UA = '';
    if (this.uniteadministratives.length > 0) {
      const UA1 = this.uniteadministratives.find(value => value.id === id);
      if(UA1) {
        UA = UA1.abbreviation;
      }
    }
    return UA;
  }

  onUniteChange() {
    if(this.uniteAd) {
      this.users = this.usersFilter.filter(value => value.idUniteAdmin === this.uniteAd.id);
    } else {
      this.users = this.usersFilter;
    }
  }

}

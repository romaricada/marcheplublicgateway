import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfilService } from 'app/admin/profil/profil.service';
import { IAccount } from 'app/core/user/account.model';

import { UserService } from 'app/core/user/user.service';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { JhiEventManager } from 'ng-jhipster';
import {IUniteAdministrative} from "app/shared/model/microserviceppm/unite-administrative.model";
import {UniteAdministrativeService} from "app/entities/microserviceppm/unite-administrative/unite-administrative.service";

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html'
})
export class UserManagementUpdateComponent implements OnInit {
  user: IAccount;
  profils: any[];
  uniteadministratives: IUniteAdministrative[];
  doNotMatch: string;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;
  success: boolean;

  editForm = this.fb.group({
    id: [null],
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    email: ['', [Validators.minLength(5), Validators.maxLength(254), ]],
    idUniteAdmin: [null, [Validators.required]],
    currentPassword: [''],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    firstName: ['', [Validators.maxLength(50)]],
    lastName: ['', [Validators.maxLength(50)]],
    activated: [true],
    langKey: [],
    profils: ['', [Validators.required]]
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private profilService: ProfilService,
    private eventManager: JhiEventManager,
    private uniadministrativeService: UniteAdministrativeService
  ) {}

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
    this.success = false;
    this.route.data.subscribe(({ user }) => {
      this.user = user.body ? user.body : user;
      this.updateForm(this.user);
    });
    this.profils = [];
    this.profilService.query().subscribe(profils => {
      this.profils = profils.body;
      window.console.log(this.profils);
    });
    this.loadUniteAdmin();
  }

  private updateForm(user: IAccount): void {
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      idUniteAdmin: user.idUniteAdmin,
      activated: user.activated,
      langKey: user.langKey,
      profils: user.profils
    });

    window.console.log('=================>Le user<================');
    window.console.log(user);
    window.console.log('=================>Le user<================');
  }

  previousState() {
    window.history.back();
  }

  save() {
    if (this.updateUser(this.user)) {
      window.console.log('=================>Le user1<================');
      window.console.log(this.user);
      window.console.log('=================>Le user1<================');
      if (this.user.id !== null) {
        this.userService.update(this.user).subscribe(() => this.onSaveSuccess(), (error: HttpErrorResponse) => this.processError(error));
      } else {
        this.user.langKey = 'fr';
        this.userService.create(this.user).subscribe(() => this.onSaveSuccess(), (error: HttpErrorResponse) => this.processError(error));
      }
    } else {
      this.doNotMatch = 'ERROR';
    }
  }

  private updateUser(user: IAccount): boolean {
    user.login = this.editForm.get(['login']).value;
    user.password = this.editForm.get(['password']).value;
    user.firstName = this.editForm.get(['firstName']).value;
    user.lastName = this.editForm.get(['lastName']).value;
    user.email = this.editForm.get(['email']).value;
    user.idUniteAdmin = this.editForm.get(['idUniteAdmin']).value;
    user.activated = this.editForm.get(['activated']).value;
    user.langKey = this.editForm.get(['langKey']).value;
    user.profils = this.editForm.get(['profils']).value;
    user.currentPassword = this.editForm.get(['currentPassword']).value;
    if (user.password !== this.editForm.get(['confirmPassword']).value) {
      return false;
    } else {
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      return true;
    }
  }

  private onSaveSuccess() {
    this.success = true;
    this.previousState();
  }

  private processError(response: HttpErrorResponse) {
    this.success = null;
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }
  trackUniteAdminById(index: number, item: IUniteAdministrative) {
    return item.id;
  }
}

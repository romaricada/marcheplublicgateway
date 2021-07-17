import { IAvenant } from 'app/shared/model/microserviceexecution/avenant.model';

export interface ITypeAvenant {
  id?: number;
  libelle?: string;
  deleted?: boolean;

  avenant?: IAvenant;

  avenants?: IAvenant[];
}

export class TypeAvenant implements ITypeAvenant {
  constructor(public id?: number, public libelle?: string, public deleted?: boolean, public avenants?: IAvenant[],public avenant?: IAvenant) {
    this.deleted = this.deleted || false;
  }
}

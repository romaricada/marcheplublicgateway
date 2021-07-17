import {ICaution} from 'app/shared/model/microservicedaccam/caution.model';

export interface ITypeCaution {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  cautions?: ICaution[];
}

export class TypeCaution implements ITypeCaution {
  constructor(
    public id?: number,
    public libelle?: string,
    public deleted?: boolean,
    public cautions?: ICaution[]
  ) {
    this.deleted = this.deleted || false;
  }
}


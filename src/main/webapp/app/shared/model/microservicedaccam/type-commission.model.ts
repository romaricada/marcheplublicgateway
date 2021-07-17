import { IMembreCommission } from 'app/shared/model/microservicedaccam/membre-commission.model';
import {IMembre} from 'app/shared/model/microservicedaccam/membre.model';

export interface ITypeCommission {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  commissions?: IMembreCommission[];
  membreCommission?: IMembreCommission;
  membres?: IMembre[];
  membreCommissions?: IMembreCommission[],
  referenceArrete?: string;
  avisDacId?: number;
}

export class TypeCommission implements ITypeCommission {
  constructor(
    public id?: number,
    public libelle?: string,
    public deleted?: boolean,
    public commissions?: IMembreCommission[],
    public membreCommission?: IMembreCommission,
    public membres?: IMembre[],
    public membreCommissions?: IMembreCommission[],
    public referenceArrete?: string,
    public avisDacId?: number
  ) {
    this.deleted = this.deleted || false;
  }
}

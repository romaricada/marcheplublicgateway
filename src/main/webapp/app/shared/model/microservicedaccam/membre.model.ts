import { IMembreCommission } from 'app/shared/model/microservicedaccam/membre-commission.model';
import {IUniteAdministrative} from "app/shared/model/microserviceppm/unite-administrative.model";
import {ITypeCommission} from "app/shared/model/microservicedaccam/type-commission.model";

export interface IMembre {
  id?: number;
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  directionId?: number;
  typeCommissionId?: number;
  direction?: IUniteAdministrative;
  post?: string;
  deleted?: boolean;
  cases?: boolean;
  commissions?: IMembreCommission[];
  typeCommission?: ITypeCommission;
}

export class Membre implements IMembre {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public telephone?: string,
    public email?: string,
    public directionId?: number,
    public typeCommissionId?: number,
    public  post?: string,
    public cases?: boolean,
    public deleted?: boolean,
    public direction?: IUniteAdministrative,
    public commissions?: IMembreCommission[],
    public typeCommission?: ITypeCommission
  ) {
    this.deleted = this.deleted || false;
    this.cases = false;
  }
}

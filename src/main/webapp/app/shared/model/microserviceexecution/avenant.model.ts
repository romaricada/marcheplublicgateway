import {Moment} from 'moment';
import {IContrat} from 'app/shared/model/microserviceexecution/contrat.model';
import {ITypeAvenant} from 'app/shared/model/microserviceexecution/type-avenant.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';

export interface IAvenant {
  id?: number;
  contratId?: number;
  reference?: string;
  motif?: string;
  montant?: number;
  typeAvenantId?: number;
  temps?: string;
  date?: Moment;
  deleted?: boolean;
  contrat?: IContrat;
  typeAvenant?: ITypeAvenant;
  files?: IFichier[];
}

export class Avenant implements IAvenant {
  constructor(
    public id?: number,
    public contratId?: number,
    public reference?: string,
    public motif?: string,
    public montant?: number,
    public typeAvenantId?: number,
    public temps?: string,
    public date?: Moment,
    public deleted?: boolean,
    public contrat?: IContrat,
    public typeAvenant?: ITypeAvenant,
    public files?: IFichier[]
  ) {
    this.deleted = this.deleted || false;
  }
}

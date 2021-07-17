import { IMembre } from 'app/shared/model/microservicedaccam/membre.model';
import { ITypeCommission } from 'app/shared/model/microservicedaccam/type-commission.model';
import { ITache } from 'app/shared/model/microservicedaccam/tache.model';
import { Poste } from 'app/shared/model/enumerations/poste.model';

export interface IMembreCommission {
  id?: number;
  avisDacId?: number;
  codeLignePlanactivite?: string;
  membreId?: number;
  typeCommissionId?: number;
  libelletypeCommission?: string;
  TacheId?: number;
  referenceArrete?: string;
  poste?: Poste;
  deleted?: boolean;
  membre?: IMembre;
  // activite?: IActivite;
  nommmembre?: string;
  membreses?: IMembre[];
  typeCommission?: ITypeCommission;
  tache?: ITache;
  libelletache?: string;

}

export class MembreCommission implements IMembreCommission {
  constructor(
    public id?: number,
    public avisDacId?: number,
    public typeCommissionId?: number,
    public membreId?: number,
    public tacheId?: number,
    public codeLignePlanactivite?: string,
    public libelletypeCommission?: string,
    public nommmembre?: string,
    public libelletache?: string,
    public referenceArrete?: string,
    public poste?: Poste,
    public deleted?: boolean,
    public membre?: IMembre,
  //  public activite?: IActivite,
    public membreses?: IMembre[],
    public typeCommission?: ITypeCommission,
    public tache?: ITache
  ) {
    this.deleted = this.deleted || false;
  }
}

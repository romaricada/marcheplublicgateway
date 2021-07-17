import { IContrat } from 'app/shared/model/microserviceexecution/contrat.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';
import {IPenalite} from "app/shared/model/microserviceexecution/penalite.model";
import {Moment} from "moment";
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";

export interface ILiquidation {
  id?: number;
  referencePaiement?: string;
  support?: string;
  etapeLiquidation?: string;
  wordFlow?: string;
  contratId?: number;
  montant?: number;
  penaliteId?: number;
  engagementId?: number;
  avisdac?: IAvisDac;
  avisdacId?: number;
  datePaiement?: Moment;
  deleted?: boolean;
  contrat?: IContrat;
  penalite?: IPenalite;
  penalites?: IPenalite[];
  files?: IFichier[];
  dateVisaControle?: Moment;
  dateVisaOrdonateur?: Moment;
  dateDeLiquidation?: Moment;
}

export class Liquidation implements ILiquidation {
  constructor(
    public id?: number,
    public referencePaiement?: string,
    public support?: string,
    public contratId?: number,
    public penaliteId?: number,
    public avisdacId?: number,
    public avisdac?: IAvisDac,
    public montant?: number,
    public engagementId?: number,
    public datePaiement?: Moment,
    public etapeLiquidation?: string,
    public wordFlow?: string,
    public deleted?: boolean,
    public contrat?: IContrat,
    public penalite?: IPenalite,
    public penalites?: IPenalite[],
    public files?: IFichier[],
    public dateVisaControle?: Moment,
    public dateVisaOrdonateur?: Moment,
    public dateDeLiquidation?: Moment
  ) {
    this.deleted = this.deleted || false;
  }
}

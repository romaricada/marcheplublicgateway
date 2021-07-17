import { IEtapeActivitePpm } from 'app/shared/model/microserviceppm/etape-activite-ppm.model';
import { IPPM } from 'app/shared/model/microserviceppm/ppm.model';
import { IActivite } from 'app/shared/model/microserviceppm/activite.model';
import { ISourceFinancement } from 'app/shared/model/microserviceppm/source-financement.model';

export class Etat {
  statut?: string;
  total?: number;
  taux?: number;
}
export interface IPpmActivite {
  id?: number;
  montantDepenseEngageNonLiquide?: number;
  creditDisponible?: number;
  periodeLancementAppel?: Date;
  periodeRemiseOffre?: Date;
  tempsNecessaireEvaluationOffre?: number;
  dateProblableDemaragePrestation?: Date;
  exerciceId?: number;
  delaiExecutionPrevu?: number;
  dateButtoire?: Date;
  deleted?: boolean;
  report?: boolean;
  etapeActivitePpms?: IEtapeActivitePpm[];
  ppm?: IPPM;
  activite?: IActivite;
  activiteId?: number;
  sourceFinancement?: ISourceFinancement;
  etats?: Etat[];
  libelleActivite?: string;
  codeLignePlanActivite?: string
}

export class PpmActivite implements IPpmActivite {
  constructor(
    public id?: number,
    public montantDepenseEngageNonLiquide?: number,
    public creditDisponible?: number,
    public periodeLancementAppel?: Date,
    public periodeRemiseOffre?: Date,
    public tempsNecessaireEvaluationOffre?: number,
    public dateProblableDemaragePrestation?: Date,
    public delaiExecutionPrevu?: number,
    public exerciceId?: number,
    public dateButtoire?: Date,
    public deleted?: boolean,
    public report?: boolean,
    public etapeActivitePpms?: IEtapeActivitePpm[],
    public ppm?: IPPM,
    public activite?: IActivite,
    public activiteId?: number,
    public sourceFinancement?: ISourceFinancement,
    public etats?: Etat[],
    public libelleActivite?: string,
    public codeLignePlanActivite?: string
  ) {
    this.report = this.report || false;
    this.deleted = this.deleted || false;
  }
}

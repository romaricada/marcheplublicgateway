import { Moment } from 'moment';
import {IBesoinLigneBudgetaire} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";
import {IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {ILot} from "app/shared/model/microservicedaccam/lot.model";
import {ILigneBudgetaire} from "app/shared/model/microserviceppm/ligne-budgetaire.model";
import {ILigneBudgetaireEngagement} from "app/shared/model/microserviceexecution/ligneBudgetaireEngagement.model";
import {ILigneBudgetaireContrat} from 'app/shared/model/microserviceexecution/ligne-budgetaire-contrat.model';
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";

export interface IEngagement {
  id?: number;
  reference?: string;
  intitule?: string;
  montantEngage?: number;
  date?: Moment;
  contratId?: number;
  ligneBudgetaireContratId?: number;
  ligneBudgetaireContrat?: ILigneBudgetaireContrat;
  ligneBudgetaireContrats?: ILigneBudgetaireContrat[];
  lotId?: number;
  deleted?: boolean;
  besoinLigneBudgetaire?: IBesoinLigneBudgetaire[];
  avisDacId?: number;
  avisDac?: IAvisDac;
  contratEn?: IContrat;
  lotEn?: ILot;
  ligneBudgetaireId?: ILigneBudgetaire;
  ligneBudget?: ILigneBudgetaire[];
  totalEngage?: number;
  engSelected?: boolean;
  ligneBudgetaireEngagement?: ILigneBudgetaireEngagement;
  ligneBudgetaireEngagements?: ILigneBudgetaireEngagement[];
  wordFlow?: string;
  label?: string;
}

export class Engagement implements IEngagement {
  constructor(
    public id?: number,
    public montantEngage?: number,
    public date?: Moment,
    public contratId?: number,
    public avisDacId?: number,
    public avisDac?: IAvisDac,
    public lotId?: number,
    public deleted?: boolean,
    public ligneBudgetaireContratId?: number,
    public ligneBudgetaireContrat?: ILigneBudgetaireContrat,
    public ligneBudgetaireContrats?: ILigneBudgetaireContrat[],
    public besoinLigneBudgetaire?: IBesoinLigneBudgetaire[],
    public contratEn?: IContrat,
    public lotEn?: ILot,
    public ligneBudgetaireId?: ILigneBudgetaire,
    public totalEngage?: number,
    public ligneBudget?: ILigneBudgetaire[],
    public engSelected?: boolean,
    public ligneBudgetaireEngagement?: ILigneBudgetaireEngagement,
    public ligneBudgetaireEngagements?: ILigneBudgetaireEngagement[],
    public reference?: string,
    public intitule?: string,
    public wordFlow?: string,
    public label?: string,
  ) {
    this.deleted = this.deleted || false;
  }
}

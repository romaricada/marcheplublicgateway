import { IBesoinLigneBudgetaire } from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import { ILigneBudgetaire } from 'app/shared/model/microserviceppm/ligne-budgetaire.model';
import { Moment } from 'moment';

export interface IBesoin {
  id?: number;
  libelle?: string;
  quantite?: number;
  deleted?: boolean;
  besoinLignes?: IBesoinLigneBudgetaire[];
  exerciceId?: number;
  uniteAdministrativeId?: number;
  ligneBudgetaires?: ILigneBudgetaire[];
  naturePrestationId?: number;
  anneeExercice?: number;
  libelleUniteAdministrative?: string;
  libellenaturePrestation?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
  checked?: Boolean;
  used?: boolean;
  montantEstime?: number;
  montantRestant?: number;
}

export class Besoin implements IBesoin {
  constructor(
    public id?: number,
    public libelle?: string,
    public quantite?: number,
    public deleted?: boolean,
    public besoinLignes?: IBesoinLigneBudgetaire[],
    public exerciceId?: number,
    public uniteAdministrativeId?: number,
    public ligneBudgetaires?: ILigneBudgetaire[],
    public naturePrestationId?: number,
    public anneeExercice?: number,
    public libelleUniteAdministrative?: string,
    public libellenaturePrestation?: string,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public checked?: Boolean,
    public used?: boolean,
    public montantEstime?: number,
    public montantRestant?: number,
  ) {
    this.deleted = this.deleted || false;
    this.checked = this.checked || false;
    this.used = this.used || false;
  }
}

import { ILigneBudgetaire } from 'app/shared/model/microserviceppm/ligne-budgetaire.model';
import { IBesoin } from 'app/shared/model/microserviceppm/besoin.model';
import { IActivite } from 'app/shared/model/microserviceppm/activite.model';

export interface IBesoinLigneBudgetaire {
  id?: number;
  deleted?: boolean;
  ligneBudget?: ILigneBudgetaire;
  besoin?: IBesoin;
  besoinLibelle?: string;
  activite?: IActivite;
  activiteLibelle?: string;
  besoinId?: number;
  ligneBudgetId?: number;
  activiteId?: number;
  budget?: string;
  ligneCredit?: string;
  aecp?: boolean;
  montantEstimeLigneBudget?: number;
  montantEstime?: number;
  dotCorAE?: number;
  dotCorCP?: number;
  montant?: number;
  selected?: boolean;
  totalEngage?: number;

}

export class BesoinLigneBudgetaire implements IBesoinLigneBudgetaire {
  constructor(
    public id?: number,
    public deleted?: boolean,
    public ligneBudget?: ILigneBudgetaire,
    public besoin?: IBesoin,
    public besoinLibelle?: string,
    public activite?: IActivite,
    public activiteLibelle?: string,
    public besoinId?: number,
    public ligneBudgetId?: number,
    public activiteId?: number,
    public budget?: string,
    public ligneCredit?: string,
    public aecpLigneBudget?: string,
    public montantEstimeLigneBudget?: number,
    public aecp?: boolean,
    public montantEstime?: number,
    public dotCorAE?: number,
    public dotCorCP?: number,
    public montant?: number,
    public selected?: boolean,
    public totalEngage?: number
  ) {
    this.deleted = this.deleted || false;
    this.selected = this.selected || false;
    this.totalEngage = this.totalEngage || 0;
  }
}

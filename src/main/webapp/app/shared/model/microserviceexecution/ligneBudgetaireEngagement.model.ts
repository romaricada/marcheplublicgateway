import {IEngagement} from "app/shared/model/microserviceexecution/engagement.model";

export interface ILigneBudgetaireEngagement {
  id?: number;
  ligneBudgetaireId?: number;
  montantEngage?: number;
  engagement?: IEngagement;
  deleted?: boolean;
}

export class LigneBudgetaireEngagement implements ILigneBudgetaireEngagement {
  constructor(
    public id?: number,
    public ligneBudgetaireId?: number,
    public montantEngage?: number,
    public engagement?: IEngagement,
    public deleted?: boolean
  ) {
    this.deleted = this.deleted || false;
  }
}

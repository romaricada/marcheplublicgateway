import { IBesoin } from 'app/shared/model/microserviceppm/besoin.model';

export interface IExerciceBudgetaire {
  id?: number;
  annee?: number;
  deleted?: boolean;
  active?: boolean;
  besoins?: IBesoin[];
  elaborer?: boolean;
}

export class ExerciceBudgetaire implements IExerciceBudgetaire {
  constructor(
    public id?: number,
    public annee?: number,
    public deleted?: boolean,
    public active?: boolean,
    public besoins?: IBesoin[],
    public elaborer?: boolean
    ) {
    this.deleted = this.deleted || false;
    this.active = this.active || false;
    this.elaborer = this.elaborer || false;
  }
}

export interface ExerciceCourant {
  exercice?: IExerciceBudgetaire;
}

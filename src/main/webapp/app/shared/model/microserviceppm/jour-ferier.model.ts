import { Moment } from 'moment';

export interface IJourFerier {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  anneeExercice?: number;
  exerciceId?: number;
  jour?: Moment;
}

export class JourFerier implements IJourFerier {
  constructor(
    public id?: number,
    public libelle?: string,
    public deleted?: boolean,
    public exerciceId?: number,
    public  anneeExercice?: number,
    public jour?: Moment
  ) {
    this.deleted = this.deleted || false;
  }
}

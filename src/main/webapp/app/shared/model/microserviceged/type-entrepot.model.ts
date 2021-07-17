import { IEntrepot } from 'app/shared/model/microserviceged/entrepot.model';

export interface ITypeEntrepot {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  entrepots?: IEntrepot[];
  ordre?: number;
}

export class TypeEntrepot implements ITypeEntrepot {
  constructor(public id?: number, public libelle?: string, public deleted?: boolean, public entrepots?: IEntrepot[], public ordre?: number) {
    this.deleted = this.deleted || false;
  }
}

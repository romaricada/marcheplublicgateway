import {TypeServeur} from "app/shared/model/enumerations/TypeServeur";

export interface IServeur {
  id?: number;
  adresse?: string;
  port?: number;
  nomServeur?: string;
  motPasse?: string;
  deleted?: boolean;
  active?: boolean;
  typeServeur?: TypeServeur;
}

export class Serveur implements IServeur {
  constructor(public id?: number, public adresse?: string, public port?: number, public nomServeur?: string, public motPasse?: string,
              public deleted?: boolean, public active?: boolean) {
    this.deleted = this.deleted || false;
    this.active = this.active || false;
  }
}

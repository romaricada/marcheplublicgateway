import {IInstitutionFinanciere} from 'app/shared/model/microservicedaccam/institutionFinanciere.model';

export interface IInstitutionFinanciere {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  institutionFinancieres?: IInstitutionFinanciere[];
}

export class InstitutionFinanciere implements IInstitutionFinanciere {
  constructor(
    public id?: number,
    public libelle?: string,
    public deleted?: boolean,
    public institutionFinancieres?: IInstitutionFinanciere[],
  ) {
    this.deleted = this.deleted || false;
  }
}

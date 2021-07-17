export interface ITimbre {
  id?: number;
  code?: string;
  sigle?: string;
  libelle?: string;
  pays?: string;
  devise?: string;
  logoContentType?: string;
  logo?: any;
  identiteMinistre?: string;
  titreMinistre?: string;
  deleted?: boolean;
  country?: any;
}

export class Timbre implements ITimbre {
  constructor(
    public id?: number,
    public code?: string,
    public sigle?: string,
    public libelle?: string,
    public pays?: string,
    public devise?: string,
    public logoContentType?: string,
    public logo?: any,
    public deleted?: boolean,
    public identiteMinistre?: string,
    public titreMinistre?: string,
    public country?: any
  ) {
    this.deleted = this.deleted || false;
  }
}

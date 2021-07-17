
export interface INormeReference {
  id?: number;
  norme?: number;
  referentiel?: number;
  normeMin?: number;
  referentielMin?: number;
  normeMax?: number;
  referentielMax?: number;
  deleted?: boolean;
  intervalle?: boolean;
  normeOuvrable?: boolean;
  referentielOuvrable?: boolean;
}

export class NormeReference implements INormeReference {
  constructor(
    public id?: number,
    public norme?: number,
    public referentiel?: number,
    public normeMin?: number,
    public referentielMin?: number,
    public normeMax?: number,
    public referentielMax?: number,
    public deleted?: boolean,
    public intervalle?: boolean,
    public normeOuvrable?: boolean,
    public referentielOuvrable?: boolean,
  ) {
    this.normeOuvrable = this.normeOuvrable || false;
    this.referentielOuvrable = this.referentielOuvrable || false;
    this.intervalle = this.intervalle || false;
    this.deleted = this.deleted || false;
  }
}

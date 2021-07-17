import {IActivite} from 'app/shared/model/microserviceppm/activite.model';
import {IReferentielDelai} from 'app/shared/model/microserviceppm/referentiel-delai.model';

export interface IModePassation {
  id?: number;
  libellePassation?: string;
  abreviation?: string;
  delais?: number;
  deleted?: boolean;
  activites?: IActivite[];
  referentielDelais?: IReferentielDelai[];
  referenciels?: IReferentielDelai[]
}

export class ModePassation implements IModePassation {
  constructor(
    public id?: number,
    public libellePassation?: string,
    public abreviation?: string,
    public delais?: number,
    public deleted?: boolean,
    public activites?: IActivite[],
    public referentielDelais?: IReferentielDelai[],
    public referenciels?: IReferentielDelai[]
  ) {
    this.deleted = this.deleted || false;
  }
}

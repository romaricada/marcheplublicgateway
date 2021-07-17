import {IReferentielDelai} from 'app/shared/model/microserviceppm/referentiel-delai.model';
import {IEtapeActivitePpm} from 'app/shared/model/microserviceppm/etape-activite-ppm.model';
import {IModePassation} from "app/shared/model/microserviceppm/mode-passation.model";

export interface IEtape {
  id?: number;
  libelle?: string;
  modePassationId?: number;
  modePassation?: IModePassation;
  modePassationLibelle?: string;
  deleted?: boolean;
  referentielDelais?: IReferentielDelai[];
  etapeActivitePpms?: IEtapeActivitePpm[];
  ordre?: number;
}

export class Etape implements IEtape {
  constructor(
    public id?: number,
    public libelle?: string,
    public modePassationId?: number,
    public passationId?: number,
    public modePassationLibelle?: string,
    public modePassation?: IModePassation,
    public deleted?: boolean,
    public referentielDelais?: IReferentielDelai[],
    public etapeActivitePpms?: IEtapeActivitePpm[],
    public ordre?: number
  ) {
    this.deleted = this.deleted || false;
  }
}

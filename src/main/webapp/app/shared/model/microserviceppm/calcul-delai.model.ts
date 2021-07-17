import {IEtape} from 'app/shared/model/microserviceppm/etape.model';
import {IModePassation} from 'app/shared/model/microserviceppm/mode-passation.model';


export interface ICalculDelai {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  etape?: IEtape;
  etapes?: IEtape[];
  modePassation?: IModePassation;
}

export class CalculDelai implements ICalculDelai {
  constructor(
    public id?: number,
    public libelle?: string,
    public deleted?: boolean,
    public etape?: IEtape,
    public etapes?: IEtape[],
    public modePassation?: IModePassation
  ) {
    this.deleted = this.deleted || false;
  }
}

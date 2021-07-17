import { IActivite } from 'app/shared/model/microserviceppm/activite.model';
import { INaturePrestationModePassation } from 'app/shared/model/microserviceppm/nature-prestation-mode-passation.model';

export interface INaturePrestation {
  id?: number;
  code?: string;
  libelle?: string;
  deleted?: boolean;
  activites?: IActivite[];
  naturePrestationModePassations? : INaturePrestationModePassation[];
}

export class NaturePrestation implements INaturePrestation {
  constructor(public id?: number, public code?: string, public libelle?: string, public deleted?: boolean, public activites?: IActivite[], public naturePrestationModePassations? : INaturePrestationModePassation[]) {
    this.deleted = this.deleted || false;
  }
}

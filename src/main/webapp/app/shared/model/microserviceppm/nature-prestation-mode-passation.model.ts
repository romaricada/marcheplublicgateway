import { IModePassation } from 'app/shared/model/microserviceppm/mode-passation.model';
import {INaturePrestation} from "app/shared/model/microserviceppm/nature-prestation.model";
export interface INaturePrestationModePassation {
  id?: number;
  montantMin?: number;
  montantMax?: number;
  deleted?: boolean;
  modePassationId?: number;
  modePassation?: IModePassation;
  naturePrestationId?: number;
  naturePrestation?: INaturePrestation;
  libelleNaturePrestation?: string;
  libelleModePassation?: string;
}

export class NaturePrestationModePassation {
  constructor(
    public id?: number,
    public montantMin?: number,
    public montantMax?: number,
    public deleted?: boolean,
    public modePassationId?: number,
    public modePassation?: IModePassation,
    public naturePrestationId?: number,
    public naturePrestation?: INaturePrestation,
    public libelleNaturePrestation?: string,
    public libelleModePassation?: string
  ) {
    this.deleted = this.deleted || false;
  }
}

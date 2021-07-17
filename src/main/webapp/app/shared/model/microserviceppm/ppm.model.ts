import {IPpmActivite} from 'app/shared/model/microserviceppm/ppm-activite.model';

export interface IPPM {
  id?: number;
  libellePpm?: string;
  referencePlan?: string;
  montantEstime?: number;
  idExercice?: number;
  valid?: boolean;
  deleted?: boolean;
  ppmActivites?: IPpmActivite[];
}

export class PPM implements IPPM {
  constructor(
    public id?: number,
    public libellePpm?: string,
    public idExercice?: number,
    public montantEstime?: number,
    public referencePlan?: string,
    public valid?: boolean,
    public deleted?: boolean,
    public ppmActivites?: IPpmActivite[]
  ) {
    this.valid = this.valid || false;
    this.deleted = this.deleted || false;
  }
}

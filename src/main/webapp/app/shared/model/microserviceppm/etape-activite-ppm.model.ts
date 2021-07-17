import { Moment } from 'moment';
import { IEtape } from 'app/shared/model/microserviceppm/etape.model';
import { IPpmActivite } from 'app/shared/model/microserviceppm/ppm-activite.model';

export interface IEtapeActivitePpm {
  id?: number;
  dateEtape?: Moment;
  deleted?: boolean;
  etape?: IEtape;
  ppmActivite?: IPpmActivite;
  dateReelle?: Moment;
  debut?: Moment;
  fin?: Moment,
  delais?: string;
  statut?: string;
  tootip?: string;
}

export class EtapeActivitePpm implements IEtapeActivitePpm {
  constructor(
    public id?: number,
    public dateEtape?: Moment,
    public deleted?: boolean,
    public etape?: IEtape,
    public ppmActivite?: IPpmActivite,
    public dateReelle?: Moment,
    public debut?: Moment,
    public fin?: Moment,
    public delais?: string,
    public statut?: string,
    public tootip?: string
  ) {
    this.deleted = this.deleted || false;
  }
}

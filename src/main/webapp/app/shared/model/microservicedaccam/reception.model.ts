import { Moment } from 'moment';
import {TypeReception} from 'app/shared/model/enumerations/TypeReception';
/* import {AvisDac } from "app/shared/model/microservicedaccam/avis-dac.model"; */
import {Lot} from "app/shared/model/microservicedaccam/lot.model";

export interface IReception {

  nomAvisDacs?: string;
  id?: number;
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  date?: Moment;
  heure?: string;
  lieu?: string;
  activiteId?: number;
  lotId?: number;
  retirer?: boolean;
  deleted?: boolean;
  typeReception?: TypeReception;
  avisDacId?: number;
  lot?: Lot;
  numeroAvis?: string;
  objet?: string;
  nomAvisDac?: string;

}

export class Reception implements IReception {
  constructor(
    public id?: number,
    public nomAvisDacs?: string,
    public nom?: string,
    public prenom?: string,
    public telephone?: string,
    public email?: string,
    public date?: Moment,
    public heure?: string,
    public lieu?: string,
    public activiteId?: number,
    public lotId?: number,
    public retirer?: boolean,
    public deleted?: boolean,
    public typeReception?: TypeReception,
    public lot?: Lot,
    public  avisDacId?: number,
    public numeroAvis?: string,
    public   objet?: string,
    public   nomAvisDac?: string


  ) {
    this.retirer = this.retirer || false;
    this.deleted = this.deleted || false;
  }
}

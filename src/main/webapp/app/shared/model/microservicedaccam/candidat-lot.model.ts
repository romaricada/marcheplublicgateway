import {IPieceCandidat} from 'app/shared/model/microservicedaccam/piece-candidat.model';
import {ICandidat} from 'app/shared/model/microservicedaccam/candidat.model';
import {IDeliberation} from 'app/shared/model/microservicedaccam/deliberation.model';
import {IDepouillement} from 'app/shared/model/microservicedaccam/depouillement.model';
import {IReclamation} from 'app/shared/model/microservicedaccam/reclamation.model';
import {ILot} from 'app/shared/model/microservicedaccam/lot.model';
import {ICandidatCautionLot} from 'app/shared/model/microservicedaccam/candidatCautionLot.model';
import {IInstitutionFinanciere} from "app/shared/model/microservicedaccam/institutionFinanciere.model";


export interface ICandidatLot {
  id?: number;
  estCandidat?: boolean;
  soumissionnaire?: boolean;
  attributaire?: boolean;
  titulaire?: boolean;
  montantLuHt?: number;
  avisDacId?: number;
  montantCorrigeHt?: number;
  montantLuTtc?: number;
  montantCorrigeTtc?: number;
  rang?: string;
  observation?: string;
  dossierPaye?: boolean;
  nombrePoint?: number;
  deleted?: boolean;
  pieceCandidats?: IPieceCandidat[];
  lotId?: number;
  lot?: ILot;
  candidatId?: number;
  institutionFinanciereId?: number;
  candidat?: ICandidat;
  contratId?: number;
  deliberationId?: number;
  deliberation?: IDeliberation;
  depouillementId?: number;
  depouillement?: IDepouillement;
  reclamation?: IReclamation;
  reclamationId?: number;
  candidatCautionLots?: ICandidatCautionLot[];
  candidatCautionLot?: ICandidatCautionLot;
  isCaution?: boolean;
  retenu?: boolean;
  lots?: ILot[];
  candidats?: ICandidat[];
  institutionFinanciere?: IInstitutionFinanciere;
  label?: string;
}

export class CandidatLot implements ICandidatLot {
  constructor(
    public id?: number,
    public estCandidat?: boolean,
    public soumissionnaire?: boolean,
    public attributaire?: boolean,
    public titulaire?: boolean,
    public montantLuHt?: number,
    public montantCorrigeHt?: number,
    public montantLuTtc?: number,
    public montantCorrigeTtc?: number,
    public rang?: string,
    public observation?: string,
    public dossierPaye?: boolean,
    public nombrePoint?: number,
    public deleted?: boolean,
    public pieceCandidats?: IPieceCandidat[],
    public lotId?: number,
    public lot?: ILot,
    public candidatId?: number,
    public avisDacId?: number,
    public contratId?: number,
    public candidat?: ICandidat,
    public deliberationId?: number,
    public deliberation?: IDeliberation,
    public depouillementId?: number,
    public depouillement?: IDepouillement,
    public reclamationId?: number,
    public institutionFinanciereId?: number,
    public reclamation?: IReclamation,
    public candidatCautionLots?: ICandidatCautionLot[],
    public candidatCautionLot?: ICandidatCautionLot,
    public institutionFinanciere?: IInstitutionFinanciere,
    public isCaution?: boolean,
    public retenu?: boolean,
    public lots?: ILot[],
    public candidats?: ICandidat[],
    public label?: string,
  ) {
    this.estCandidat = this.estCandidat || false;
    this.soumissionnaire = this.soumissionnaire || false;
    this.attributaire = this.attributaire || false;
    this.titulaire = this.titulaire || false;
    this.dossierPaye = this.dossierPaye || false;
    this.deleted = this.deleted || false;
    this.isCaution = this.isCaution || false;
    this.retenu = this.retenu || false;
  }
}

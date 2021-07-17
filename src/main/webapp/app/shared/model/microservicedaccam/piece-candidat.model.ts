import {ICandidatLot} from 'app/shared/model/microservicedaccam/candidat-lot.model';
import {IPiece} from 'app/shared/model/microservicedaccam/piece.model';

export interface IPieceCandidat {
  id?: number;
  deleted?: boolean;
  candidatLot?: ICandidatLot;
  candidatLotId?: number;
  piece?: IPiece;
  valide?: boolean;
}

export class PieceCandidat implements IPieceCandidat {
  constructor(public id?: number,
              public deleted?: boolean,
              public candidatLot?: ICandidatLot,
              public candidatLotId?: number,
              public piece?: IPiece,
              public valide?: boolean,
              ) {
    this.deleted = this.deleted || false;
  }
}

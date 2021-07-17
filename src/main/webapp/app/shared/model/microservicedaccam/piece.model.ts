export interface IPiece {
  id?: number;
  deleted?: boolean;
  nomPiece?: string;
}

export class Piece implements IPiece {
  constructor(
    public id?: number,
    public deleted?: boolean,
    public nomPiece?: string) {
    this.deleted = this.deleted || false;
  }
}

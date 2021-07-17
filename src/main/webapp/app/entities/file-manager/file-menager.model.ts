export interface IFichier {
  fileName?: string;
  fileContentType?: string;
  file?: any;

}

export class Fichier implements IFichier {
  constructor(
    public fileName?: string,
    public fileContentType?: string,
    public file?: any,
  ) {}
}

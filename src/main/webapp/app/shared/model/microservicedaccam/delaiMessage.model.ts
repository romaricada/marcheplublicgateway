
import {TypeMessage} from "app/shared/model/enumerations/TypeMessage";

export interface IDelaiMessage {
  id?: number;
  tempsAlerte?: string;
  typeMessage?: TypeMessage;
  message?: string;
  deleted?: boolean;

}

export class DelaiMessage implements IDelaiMessage {
  constructor(
    public id?: number,
    public tempsAlerte?: string,
    public message?: string,
    public deleted?: boolean,

  ) {
    this.deleted = this.deleted || false;
  }
}


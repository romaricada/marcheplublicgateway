
export interface IUserNotification {
  id?: number;
  visited?: boolean;
  jour?: Date;
  deleted?: boolean;
  userId?: number;
  tacheEtapeId?: number;
  tacheEtape?: any;
}

export class UserNotification implements IUserNotification{
  constructor(
    public id?: number,
    public visited?: boolean,
    public jour?: Date,
    public deleted?: boolean,
    public userId?: number,
    public tacheEtapeId?: number,
    public tacheEtape?: any
  ) {}
}

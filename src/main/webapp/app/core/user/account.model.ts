export interface IAccount {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  idUniteAdmin?: number;
  activated?: boolean;
  langKey?: string;
  authorities?: any[];
  profils?: any[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
  currentPassword?: string;
  imageUrl?: string;
  passChange?: boolean
}

export class Account implements IAccount {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public idUniteAdmin?: number,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: any[],
    public profils?: any[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public currentPassword?: string,
    public imageUrl?: string,
    public passChange?: boolean
  ) {
    this.id = id ? id : null;
    this.login = login ? login : null;
    this.firstName = firstName ? firstName : null;
    this.lastName = lastName ? lastName : null;
    this.email = email ? email : null;
    this.idUniteAdmin = idUniteAdmin ? idUniteAdmin : null;
    this.activated = activated ? activated : true;
    this.langKey = langKey ? langKey : null;
    this.authorities = authorities ? authorities : null;
    this.profils = profils ? profils : null;
    this.createdBy = createdBy ? createdBy : null;
    this.createdDate = createdDate ? createdDate : null;
    this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
    this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
    this.password = password ? password : null;
    this.currentPassword = currentPassword ? currentPassword : null;
    this.imageUrl = imageUrl ? imageUrl : null;
    this.passChange = passChange ? passChange : false
  }
}

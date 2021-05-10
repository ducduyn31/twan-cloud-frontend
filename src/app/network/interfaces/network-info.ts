export interface NetworkInfo {
  networkid: number;
  name: string;
  serialnumber: string;
  type: number;
  userid: number;
  createtime: Date;
  updatetime: Date;
  version: string;
  isdelete: boolean;
  isdefault: boolean;
  authrule: AuthRule;
  line: string;
  linename: string;
  routernum: number;
  clientnum: number;
  servernum: number;
  bypassnum: number;
  speed: number;
  intelligentlink: boolean;
}

export interface AuthRule {
  mold: string;
}

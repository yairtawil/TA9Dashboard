export interface IUser {
  id: string;
  name: string;
  resolution: string;
  ip?: string;
  isConnected: boolean;
  lastSeen: Date;
  os: string;
  browser: string;
}

export interface Hour {
  is_local_holiday: boolean;
  open_now: boolean;
  seasonal: Array<any>;
}
export interface Place {
  distance?: number;
  hours?: Hour;
  name?: string;
  photos?: Array<any>;
  price?: number;
}
export enum Errors{
    PERMISSION_DENIED= 'PERMISSION_DENIED',
    POSITION_UNAVAILABLE = 'POSITION_UNAVAILABLE',
    TIMEOUT='TIMEOUT'
}
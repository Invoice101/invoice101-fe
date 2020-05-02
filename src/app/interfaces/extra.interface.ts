export interface StateInterface {
  id: number;
  name: string;
  short_name: string;
  code: string;
}

export interface UOMInterface {
  short_name: string; // Primary Key
  name: string;
}

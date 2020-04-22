export interface CustomerInterface {
  id: string;

  owner: number;
  name: string;
  email: string;
  company: string;
  mobile_no: string;

  gstin: string;

  address_line_1: string;
  address_line_2: string;
  city: string;
  state: number;
  pin_code: string;
}

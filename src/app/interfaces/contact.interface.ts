export interface ContactInterface {
  id: string;

  owner: number;
  name: string;
  email: string;
  company: string;
  mobile_no: string;

  is_customer: boolean;
  is_supplier: boolean;

  type: 'CUSTOMER' | 'SUPPLIER';
  gstin: string;

  billing_address_line_1: string;
  billing_address_line_2: string;
  billing_city: string;
  billing_state: number;
  billing_pin_code: string;

  shipping_address_line_1: string;
  shipping_address_line_2: string;
  shipping_city: string;
  shipping_state: number;
  shipping_pin_code: string;

  image: string;
}

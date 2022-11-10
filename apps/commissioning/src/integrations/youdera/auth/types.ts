export enum Role {
  roofer = 'roofer',
  electrician = 'electrician',
}

export interface LoginJWTResponse {
  access_token: string;
}

export interface UserInfo {
  active: boolean;
  address: string | null;
  avatar: string | null;
  bic: string;
  channel_partner: string | null;
  commercial_register_number: string | null;
  company: string;
  contact_method: string | null;
  created_at: Date | null;
  currency: string;
  customer_id: string | null;
  deleted_at: Date | null;
  email: string;
  first_name: string;
  group: string | null;
  group_id: string | null;
  iban: string;
  id: string;
  image: string;
  is_archived: boolean;
  language: string;
  last_login_at: Date;
  last_login_ip: string;
  last_name: string;
  last_visit_at: Date | null;
  last_visit_ip: string | null;
  locale: string;
  number: string | null;
  opportunity_id: string | null;
  phone: string | null;
  referral: string | null;
  role: Role;
  salutation: string | null;
  solar_partner: string | null;
  tax_id: string | null;
  updated_at: Date;
  was_activated: boolean;
  yield_co: string | null;
}

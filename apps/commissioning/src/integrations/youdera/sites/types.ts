import { Battery } from "../batteries/types";
import { ApiFile } from "../files/types";
import { Inverter } from "../inverters/types";
import { Meter } from "../meters/types";

export type MonthMap<T> = {
  apr: T;
  aug: T;
  dec: T;
  feb: T;
  jan: T;
  jul: T;
  jun: T;
  mar: T;
  may: T;
  nov: T;
  oct: T;
  sep: T;
};

export interface Address {
  city: string;
  region: string;
  street: string;
  country: string;
  postal_code: string;
}

export interface File {}

export interface Site {
  id: number;
  name: string;
  wattpeak: number;
  prediction: MonthMap<number>;
  oc_prediction: MonthMap<number | null>;
  c_prediction: MonthMap<number | null>;
  tags: string | null;
  commissioning_date: Date | null;
  installation_date: Date | null;
  collection_start_date: Date | null;
  end_date: Date | null;
  image: string | null;
  address: Address;
  performance_degression: number;
  annual_specific_yield: number;
  annual_oc: boolean;
  note: string;
  is_public: false;
  has_combined_yield: boolean;
  has_fix_reads: boolean;
  longitude: string;
  latitude: string;
  raw_wattpeak: number;
  public_url: string;
  files: File[];
  created_at: Date;
  updated_at: Date;

  inverters?: Inverter[];
  batteries?: Battery[];
  meters?: Meter[];
}

export interface SiteWithFiles extends Site {
  files: ApiFile[];
}
export type DataResponse<T> = {
  data: T;
};

export enum ApiFileType {
  stringLayout = 'string layout',
  additionalPictures = 'additional pictures',
}

export interface ApiFile {
  id: string;
  name: string;
  type: ApiFileType;
  size: number;
  visible_for_customer: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  url: string;
  /** Note this can be missing for old image uploads */
  url_thumb: string | null;
}

export type CommunicationStatus = 'pending' | 'failed' | 'success';

export type VerificationTestStatus = 'failed' | 'warning' | 'success';

export type VerificationTestResult = {
  id: number;
  status: VerificationTestStatus;
  result: string;
  result_code: number;
  created_at: string;
  updated_at: string;
};

/**
 * This is some generic data structure embedded in devices (inverters, batteries, meters)
 * Currently the communication method settings are stored inside.
 */
export type Datapoint = {
  import_config: {
    ip?: string;
    slave_id: number;
  };
};

export type Meter = {
  id: number;
  name: string;
  number: string;
  communication_status: CommunicationStatus;

  factor: number;

  manufacturer: number;
  model: number;
  manufacturer_name: string;
  model_name: string;

  /** This might be an enum where "generation" is at least on option? */
  type: string;

  is_auxiliary: 0;

  /** Assume this can be ISO date string, not sure */
  replacement_by: string | null;
  replacement_date: string | null;

  testlogs: VerificationTestResult[];

  created_at: string;
  updated_at: string;

  files?: ApiFile[];

  /** maps to some JSON column in db */
  datapoints?: Datapoint[];
};

export type Battery = {
  id: number;
  name: string;
  serial_number: string;
  communication_status: CommunicationStatus;

  testlogs: VerificationTestResult[];

  manufacturer: number;
  model: number;
  manufacturer_name: string;
  model_name: string;

  created_at: string;
  updated_at: string;
  files?: ApiFile[];

  /** maps to some JSON column in db */
  datapoints?: Datapoint[];
};

export type Inverter = {
  id: number;
  name: string;
  serial_number: string;
  communication_status: CommunicationStatus;

  testlogs: VerificationTestResult[];

  manufacturer: number;
  model: number;
  manufacturer_name: string;
  model_name: string;

  mpp_trackers: MppTracker[];
  files?: ApiFile[];

  /** maps to some JSON column in db */
  datapoints?: Datapoint[];
};
export interface InverterModel {
  id: number;
  type: string;
  name: string;
  manufacturer_id: number;
  manufacturer_name: string;
  data: {
    inputs: number;
    auto_serialnumber: boolean;
  };
}

export type MppTracker = {
  id: string;
};

export interface Module {
  id: number;
  type: string;
  name: string;
  manufacturer_id: number;
  manufacturer_name: string;
  data: {
    wattpeak: number;
  };
}
export interface CreateInverterRequestBody {
  serial_number?: string;
  site: number;
  cmodel?: number;
}

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

export interface Site {
  id: number;
  name: string;
  wattpeak: number;
  prediction: MonthMap<number>;
  oc_prediction: MonthMap<number | null>;
  c_prediction: MonthMap<number | null>;
  tags: string | null;
  commissioning_date: string | null;
  installation_date: string | null;
  collection_start_date: string | null;
  end_date: string | null;
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
  created_at: string;
  updated_at: string;

  files?: ApiFile[];
  inverters?: Inverter[];
  batteries?: Battery[];
  meters?: Meter[];
}

export interface SiteWithFiles extends Site {
  files: ApiFile[];
}
export interface String {
  id: number;
  name: string | null;
  count: number;
  module: number;
  cable_cross_section: number;
  wattpeak_per_module: number;
  mpp_tracker: MppTracker;
  files: ApiFile[];
  created_at: string;
  updated_at: string;
}
export interface StringsOnRoof {
  id: number;
  name: string;
  orientation: string;
  inclination: number;
  specific_yield: number;
  strings: String[];
  created_at: string;
  updated_at: string;
}

export interface CreateStringRequestBody {
  count: number;
  roof: number;
  module: string;
  cable_cross_section: number;
  mpp_tracker: number;
}

export interface CreateBatteryRequest {
  name: 'DEVICE_NAME';
  type: 'DEVICE_TYPE';
  serial_number: '123456789';
  site: 3;
}

export interface AddFileToBatteryRequest {
  file: File;
  batteryId: Battery['id'];
}

// TODO update
export interface BatteryModel {
  id: number;
  name: string;
  manufacturer_id: number;
  manufacturer_name: string;
}

export type ProjectManagerContactInfo = {
  phone: string;
};

export type CommsStatus = 'failed';

export type CommsTestResult = {
  status: CommunicationStatus;
  serial_number: string | null;
  /** Only set for batteries (if successful) */
  power: number | null;
};

export type CommsParams = {
  /** Set if the method is DHCP */
  dhcp?: true;
  /** Set if the method is Fixed IP */
  ip?: string;
  slave_id: number;
};

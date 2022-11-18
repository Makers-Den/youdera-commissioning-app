import { CommunicationStatus } from '../apiTypes';
import { ApiFile } from '../files/types';

export type Inverter = {
  id: number;
  name: string;
  serial_number: string;
  communication_status: CommunicationStatus;

  manufacturer: string;
  model: string;

  mpp_trackers?: MppTracker[];
  files?: ApiFile[];
};

/**
 * TODO: move somewhere else.
 * We don't know what this looks like yet.
 */
export type MppTracker = {
  id: string;
};

export interface CreateInverterRequestBody {
  name: string;
  serial_number: string;
  site: number;
  manufacturer: string;
  metered_by?: number;
  cmodel?: number;
}

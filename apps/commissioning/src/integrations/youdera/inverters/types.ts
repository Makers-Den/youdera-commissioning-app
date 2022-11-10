
export type Inverter = {
  id: number;
  name: string;
  serial_number: string;
  
  manufacturer: string;
  model: string;

  mpp_trackers?: MppTracker[];
  files?: File[];
}


/**
 * TODO: move somewhere else. 
 * We don't know what this looks like yet.
 */
export type MppTracker = {
  id: string;
}
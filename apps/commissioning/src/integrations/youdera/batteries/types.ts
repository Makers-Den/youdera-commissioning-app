import { ApiFile } from "../files/types";
import { CommunicationStatus } from "../types";

export type Battery = {
  id: number;
  name: string;
  serial_number: string;
  communication_status: CommunicationStatus;

  manufacturer: string;
  model: string;
  created_at: string;
  updated_at: string;
  files?: ApiFile[];
}
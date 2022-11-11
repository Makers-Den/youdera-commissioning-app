import { ApiFile } from "../files/types";

export type Battery = {
  id: number;
  name: string;
  serial_number: string;
  manufacturer: string;
  model: string;
  created_at: string;
  updated_at: string;
  files?: ApiFile[];
}
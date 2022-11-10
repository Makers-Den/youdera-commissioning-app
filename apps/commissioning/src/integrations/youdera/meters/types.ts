
export type Meter = {
  id: number;
  name: string;
  number: string;
  factor: number;
  manufacturer: string;
  model: string;
  /** This might be an enum where "generation" is at least on option? */
  type: string; 

  is_auxiliary: 0,
  
  /** Assume this can be ISO date string, not sure */
  replacement_by: string | null,
  replacement_date: string | null,

  /** Assume string array, not sure */
  testlogs: string[]

  created_at: string;
  updated_at: string;
  
  files?: File[];
}
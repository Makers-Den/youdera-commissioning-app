import { Site } from '../sites/types';

export interface ModuleField {
  id: number;
  name: string;
  orientation: number;
  inclination: number;
  specific_yield: number;
  site: number;
}

export interface SiteWithModuleFields extends Site {
  roofs: ModuleField[];
}

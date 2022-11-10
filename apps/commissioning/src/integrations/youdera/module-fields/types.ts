import { Site } from '../sites/types';

export interface ModuleField {
  id: string;
  name: string;
  orientation: number;
  inclination: number;
  specific_yield: number;
  site: number;
}

export interface SiteWithModuleFields extends Site {
  roofs: ModuleField[];
}

export interface CreateModuleRequestBody {
  name: string;
  orientation: number;
  inclination: number;
  specific_yield: number;
  site: string;
}

export interface UpdateModuleRequestBody {
  id: string;
  name?: string;
  orientation?: number;
  inclination?: number;
  specific_yield?: number;
}

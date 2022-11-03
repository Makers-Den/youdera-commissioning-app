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

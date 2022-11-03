export interface InverterModel {
  id: number,
  type: string,
  name: string,
  manufacturer_id: number,
  manufacturer_name: string,
  data: {
    auto_serialnumber: boolean
  }
}
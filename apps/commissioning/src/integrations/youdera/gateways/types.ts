
export type Gateway = {
  id: number,
  "name": string,
  "password": string
  "serial_number": string,
  /** ISO formatted date string. E.g. "2022-11-10T10:44:56.000000Z" */
  "created_at": string,
  /** ISO formatted date string. E.g. "2022-11-10T10:44:56.000000Z" */
  "updated_at": string,
  "sim_iccid": string,
  /** Always null if unattached */
  "site_id": number | null
}

export interface Input {
	//TODO
}

export interface Inverter {
	id: number,
	name: string,
	serial_number: string,
	manufacturer: string,
	model: string,
	mpp_trackers: Input[],
	created_at: string,
	updated_at: string
}

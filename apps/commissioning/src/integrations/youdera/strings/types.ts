export interface String {
	id: number,
	name: string | null,
	count: number,
	module: string,
	cable_cross_section: number,
	wattpeak_per_module: number,
	created_at: string,
	updated_at: string,
}
export interface StringsOnRoof {
	id: number,
	name: string,
	orientation: string,
	inclination: number,
	specific_yield: number,
	strings: String[],
	created_at: string,
	updated_at: string,
}

export interface CreateStringRequestBody {
	count: number,
	roof: number,
	module: string,
	cable_cross_section: number
}

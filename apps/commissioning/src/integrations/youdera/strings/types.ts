export interface String {
	id: number,
	name: string | null,
	count: number,
	wattpeak_per_module: number,
	created_at: string,
	updated_at: string,
	module_type: string
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
	wattpeak_per_module: number,
	roof: number
}

export interface String {
	id: number,
	name: string | null,
	count: number,
	wattpeak_per_module: number,
	created_at: Date,
	updated_at: Date
}
export interface StringsOnRoof {
	id: number,
	name: string,
	orientation: string,
	inclination: number,
	specific_yield: number,
	strings: String[],
	created_at: Date,
	updated_at: Date
}

export interface CreateStringRequestBody {
	count: number,
	wattpeak_per_module: number,
	roof: number
}

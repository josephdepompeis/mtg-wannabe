// duplicate of card.model.ts
export interface Card {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
	set: string;
	setCode: string;
	text: string;
	rarity: string;
	number: string;
	currentInventory: number;
	type: string;
	amount: number;
}

export enum InventoryActionTypes {
	FETCH_REQUEST = "@@inventory/FETCH_REQUEST",
	FETCH_SUCCESS = "@@inventory/FETCH_SUCCESS",
	FETCH_ERROR = "@@inventory/FETCH_ERROR"
}

export interface InventoryState {
	readonly loading: boolean;
	readonly data: Card[];
	readonly errors?: string;
}

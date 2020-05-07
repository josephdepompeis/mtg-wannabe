import {combineReducers} from "redux";
import {connectRouter, RouterState} from "connected-react-router";

import {History} from "history";

import {InventoryReducer} from "./card/reducer";
import {InventoryState} from "./card/types";

import {cartReducer} from "./cart/reducer";
import {cartState} from "./cart/types";

export interface ApplicationState {
	cart: cartState;
	cards: InventoryState;
	router: RouterState;
}

export const createRootReducer = (history: History) =>
	combineReducers({
		cart: cartReducer,
		cards: InventoryReducer,
		router: connectRouter(history)
	});

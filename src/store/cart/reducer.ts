import {Reducer} from "redux";
import find from 'lodash/find';

import {CartActionTypes, cartState} from "./types";
import {Inventory} from "../inventory/types";

export const initialState: cartState = {
    data: {
        id: 0,
        items: []
    },
    errors: undefined,
    loading: false
};

const reducer: Reducer<cartState> = (state = initialState, action) => {
    switch (action.type) {
        case CartActionTypes.FETCH_CART_REQUEST: {
            return { ...state, loading: true };
        }
        case CartActionTypes.FETCH_CART_SUCCESS: {
            return { ...state, loading: false, data: action.payload };
        }
        case CartActionTypes.FETCH_CART_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        case CartActionTypes.ADD_TO_CART: {
            const cardAlreadyAdded = find(state.data.items, ['id', action.payload.id]);
            let updatedItemsState: Inventory[];
            // if card already exists in state, update amount
            if (cardAlreadyAdded) {
                cardAlreadyAdded.amount++;
                updatedItemsState = state.data.items;
            // if card does not exist in state, set amount to 1 and add card to state
            } else {
                action.payload.amount = 1;
                updatedItemsState = [...state.data.items, action.payload];
            }
            return {
                errors: state.errors,
                loading: state.loading,
                data: {
                    ...state.data,
                    id: state.data.id,
                    items: updatedItemsState
                }
            };
        }
        case CartActionTypes.REMOVE_FROM_CART: {
            const card = find(state.data.items, ['id', action.payload.id]);
            if (card) {
                card.amount--;
            }

            if (card && card.amount === 0) {
                state.data.items = state.data.items.filter(item => item !== card);
            }

            return {
                errors: state.errors,
                loading: state.loading,
                data: {
                    ...state.data,
                    id: state.data.id,
                    items: state.data.items
                }
            };
        }
        default: {
            return state;
        }
    }
};

export { reducer as cartReducer };

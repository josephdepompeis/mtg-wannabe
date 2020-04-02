import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { ApplicationState } from "../../store";
import { Cart } from "../../store/cart/types";
import {Inventory} from "../../store/inventory/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {addToCart, removeFromCart} from "../../store/cart/action";
const CartContainer = styled.div`
  /* height: 100%;
  width: 100%; */
  padding: 30px;
`;
const CartHeader = styled.h2``;
const CartHeaderDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const CartListsDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const CartListItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartListItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

const CardAttributeColumn = styled.p``;

const AddToCartButton = styled.button`
  padding: 10px;
  background-color: blue;
  color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
`;

const RemoveFromCartButton = styled.button`
  padding: 10px;
  background-color: red;
  color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
`;

interface propsFromState {
    cartItems: Cart;
    addToCart: (item: Inventory) => any,
    removeFromCart: (item: Inventory) => any;
}

type AllProps = propsFromState;

const CartComponent: React.FC<AllProps> = ({ cartItems, addToCart, removeFromCart}) => {
    const calculateCartItemPrice = (item: Inventory) => {
        return item.price * item.amount;
    };

    const addItemToCart = (item: Inventory) => {
        addToCart(item);
    };

    const removeItemFromCart = (item: Inventory) => {
        removeFromCart(item);
    };

    return (
        <CartContainer>
            <CartHeaderDiv>
                <CartHeader>Your Cart</CartHeader>
            </CartHeaderDiv>
            <CartListItemDiv>
                <CardAttributeColumn>image</CardAttributeColumn>
                <CardAttributeColumn>name</CardAttributeColumn>
                <CardAttributeColumn>quantity</CardAttributeColumn>
                <CardAttributeColumn>price</CardAttributeColumn>
            </CartListItemDiv>
            <CartListsDiv>
                {cartItems.items.map(item => {
                    return (
                        <CartListItemDiv>
                            <CartListItemImage src={item.image} />
                            <CardAttributeColumn>{item.name}</CardAttributeColumn>
                            <CardAttributeColumn>{item.amount}</CardAttributeColumn>
                            <CardAttributeColumn>${calculateCartItemPrice(item)}</CardAttributeColumn>
                            <CardAttributeColumn>
                                <AddToCartButton onClick={() => addItemToCart(item)}>Add To Cart</AddToCartButton>
                                <RemoveFromCartButton onClick={() => removeItemFromCart(item)}>Remove From Cart
                                </RemoveFromCartButton>
                            </CardAttributeColumn>
                        </CartListItemDiv>
                    );
                })}
            </CartListsDiv>
        </CartContainer>
    );
};

const mapStateToProps = ({ cart }: ApplicationState) => ({
    cartItems: cart.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        addToCart: (item: any) => dispatch(addToCart(item)),
        removeFromCart: (item: any) => dispatch(removeFromCart(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);

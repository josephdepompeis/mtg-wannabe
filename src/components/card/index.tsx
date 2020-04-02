import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {Inventory} from "../../store/inventory/types";
import {addToCart, removeFromCart} from "../../store/cart/action";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {ApplicationState} from "../../store";

const CardContainer = styled.div`
  background-color: #eeeeee;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 15px;
  flex: 0 0 25%;
`;

const CardFigure = styled.figure`
  width: 230px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

const CardHeader = styled.h1`
  height: 76px;
`;

const CardDescription = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardSetText = styled.text``;

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

interface propsFromComponent {
    item: Inventory;
    cartItems: any;
}

interface propsFromDispatch {
    addToCart: (item: Inventory) => any,
    removeFromCart: (item: Inventory) => any;
}

type Props = propsFromComponent & propsFromDispatch;

const Card: React.FC<Props> = ({item, addToCart, removeFromCart}) => {
    const addItemToCart = (item: Inventory) => {
        addToCart(item);
    };

    const removeItemFromCart = (item: Inventory) => {
        removeFromCart(item);
    };

    return (
        <CardContainer>
            <CardFigure>
                <CardImage src={item.image} />
            </CardFigure>
            <CardHeader>{item.name}</CardHeader>
            <CardDescription>
                <CardSetText>Set: {item.set}</CardSetText>
                <CardSetText>Price: ${item.price}</CardSetText>
                <AddToCartButton onClick={() => addItemToCart(item)}>Add To Cart</AddToCartButton>
                <RemoveFromCartButton onClick={() => removeItemFromCart(item)}>Remove From Cart</RemoveFromCartButton>
            </CardDescription>
        </CardContainer>
    );
};

const mapStateToProps = ({ cart }: ApplicationState) => ({
    cartItems: cart
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        addToCart: (item: any) => dispatch(addToCart(item)),
        removeFromCart: (item: any) => dispatch(removeFromCart(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {Inventory} from "../../store/inventory/types";
import {addToCart} from "../../store/cart/action";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

const CardContainer = styled.div`
  background-color: #eeeeee;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 15px;
  cursor: pointer;
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

const AddToCart = styled.button`
  padding: 10px;
  background-color: blue;
  color: #ffffff;
  border-radius: 10px;
`;

interface propsFromComponent {
    item: Inventory;
}

interface propsFromDispatch {
    addToCart: (item: any) => any;
}

type Props = propsFromComponent & propsFromDispatch;

const Card: React.FC<Props> = ({ item, addToCart }) => {
    const AddItemToCart = (item: any) => {
        addToCart(item);
    };

    return (
        <CardContainer>
            <CardFigure>
                <CardImage src={item.image} />
            </CardFigure>
            <CardHeader>{item.name}</CardHeader>
            <CardDescription>
                <CardSetText>{item.set}</CardSetText>
                <AddToCart onClick={() => AddItemToCart(item)}>Add To Cart</AddToCart>
            </CardDescription>
        </CardContainer>
    );
};

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        addToCart: (item: any) => dispatch(addToCart(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

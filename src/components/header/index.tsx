import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Cart} from "../../store/cart/types";
import {ApplicationState} from "../../store";
import {Inventory} from "../../store/inventory/types";

const NavContainer = styled.div`
  width: 100%;
  height: 50px;
  /* position: fixed; */
  background: #e7e8eb;
  margin: auto;
`;

const NavHeader = styled.div`
  width: 20%;
  float: left;
  padding: 10px;
`;

const NavCart = styled.div`
  width: 20%;
  float: right;
  padding: 10px;
  cursor: pointer;
`;

const CartSpan = styled.span`
  background-color: #6394f8;
  border-radius: 10px;
  color: white;
  display: inline
  font-size: 12px;
  line-height: 1;
  padding: 3px 7px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
`;

interface propsFromState {
    data: Cart;
    loading: boolean;
    errors?: string;
}

type AllProps = propsFromState;

const Header: React.FC<AllProps> = ({data, loading, errors, children}) => {
    const calculateCartItemAmount = (cartItems: Inventory[]) => {
        let amountTotal = 0;
        cartItems.forEach(item => {
            amountTotal = amountTotal + item.amount;
        });
        return amountTotal;
    };

    return (
        <div>
            <NavContainer>
                <NavHeader>
                    <Link to="/">Home</Link>
                </NavHeader>
                <NavCart>
                    <Link to="/cart">Cart</Link>
                    <CartSpan>{calculateCartItemAmount(data.items)}</CartSpan>
                </NavCart>
            </NavContainer>
            {children}
        </div>
    );
};


const mapStateToProps = ({cart}: ApplicationState) => ({
    data: cart.data,
    loading: cart.loading,
    errors: cart.errors
});

export default connect(mapStateToProps)(Header);

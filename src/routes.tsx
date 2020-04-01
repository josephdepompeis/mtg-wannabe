import React from "react";
import { Route, Switch } from "react-router-dom";
import CardSelect from "./components/cardSelect";
import Cart from "./components/cart";

import Navbar from "./components/header";
const Routes: React.SFC = () => (
    <div>
        <Switch>
            <Route
                exact
                path="/"
                render={() => (
                    <Navbar>
                        <CardSelect/>
                    </Navbar>
                )}
            />
            <Route
                path="/cart"
                render={() => (
                    <Navbar>
                        <Cart/>
                    </Navbar>
                )}
            />
        </Switch>
    </div>
);

export default Routes;

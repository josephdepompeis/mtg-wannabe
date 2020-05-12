import React from "react";
import {Route, Switch} from "react-router-dom";
import CardSelect from "./components/cardSelect";
import Cart from "./components/cart";
import Navbar from "./components/header";
import {ContactUsForm} from "./components/contactUs/contactUsForm";
import {Admin} from "./components/admin";
import {LoginForm} from "./components/login/loginForm";

const Routes: React.FunctionComponent = () => (
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
			<Route
				path="/contactUs"
				render={() => (
					<ContactUsForm>
					</ContactUsForm>
				)}
			/>
			<Route
				path="/admin"
				render={() => (
					<Admin>
					</Admin>
				)}
			/>
			<Route
				path="/login"
				render={() => (
					<LoginForm>
					</LoginForm>
				)}
			/>
		</Switch>
	</div>
);

export default Routes;

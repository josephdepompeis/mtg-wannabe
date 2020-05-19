import * as React from "react";
import {Field} from "../../field";
import {Form, IFields, isEmail, required} from "../../form";
import axios from "axios";

export class LoginForm extends React.Component {
	/**
	 * Submits the form to the http api
	 * @returns {boolean} - Whether the form submission was successful or not
	 */
	private async submitLogin(formData: {}): Promise<boolean> {

		try {
			const response = axios.post('http://localhost:5000/signUp', formData);

			// Success 🎉
			console.log(response);
			return true;
		} catch (error) {
			// Error 😨
			if (error.response) {
				/*
				 * The request was made and the server responded with a
				 * status code that falls out of the range of 2xx
				 */
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				return error;

			} else if (error.request) {
				/*
				 * The request was made but no response was received, `error.request`
				 * is an instance of XMLHttpRequest in the browser and an instance
				 * of http.ClientRequest in Node.js
				 */
				console.log(error.request);
				return error;

			} else {
				// Something happened in setting up the request and triggered an Error
				console.log('Error', error.message);
				return error;
			}
		}
	};

	public render() {
		const fields: IFields = {
			email: {
				id: "email",
				label: "Email",
				validation: {rule: isEmail},
			},
			password: {
				id: "password",
				label: "Password",
				validation: {rule: required},
			},
		};

		return (
			<Form
				fields={fields}
				submit={this.submitLogin}
				render={() => (
					<React.Fragment>
						<div className="alert alert-info" role="alert">
							Login Here:
						</div>
						<Field {...fields.email} />
						<Field {...fields.password} />
					</React.Fragment>
				)}
			/>
		);
	};
}

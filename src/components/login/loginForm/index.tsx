import * as React from "react";
import {Field} from "../../field";
import {Form, IFields, isEmail, maxLength, required} from "../../form";
import axios from "axios";

export class LoginForm extends React.Component {

	/**
	 * Submits the form to the http api
	 * @returns {boolean} - Whether the form submission was successful or not
	 */
	private async submitLogin(formValues: {}): Promise<boolean> {
		try {
			const response = axios.post('http://localhost:5000/contactUs', {});

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
			name: {
				id: "name",
				label: "Name",
				validation: {rule: required},
			},
			email: {
				id: "email",
				label: "Email",
				validation: {rule: isEmail},
			},
			reason: {
				id: "reason",
				label: "Reason",
				editor: "dropdown",
				options: ["", "Marketing", "Support", "Feedback", "Jobs"],
				validation: {rule: required},
			},
			notes: {
				id: "notes",
				label: "Notes",
				editor: "multilinetextbox",
				validation: {rule: maxLength, args: 1000},
			}
		};

		return (
			<Form
				submit={this.submitLogin}
				fields={fields}
				render={() => (
					<React.Fragment>
						<div className="alert alert-info" role="alert">
							Enter the information below and we'll get back to you as soon as we
							can.
						</div>
						<Field {...fields.name} />
						<Field {...fields.email} />
						<Field {...fields.reason} />
						<Field {...fields.notes} />
					</React.Fragment>
				)}
			/>
		);
	};
}

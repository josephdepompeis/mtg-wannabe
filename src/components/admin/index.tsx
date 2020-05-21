import * as React from "react";
import axios from "axios";
import styled from "styled-components";

const AddToCartButton = styled.button`
  padding: 10px;
  background-color: blue;
  color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
`;

export class Admin extends React.Component {
	public async addSetToDB(setCode: string) {
		try {
			const response = await axios.post('http://localhost:5000/cardSets/add', {setCode: setCode});

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
		return (
			<div>
				<AddToCartButton onClick={() => this.addSetToDB("STU")}>ADD STU CARD SET</AddToCartButton>
				<AddToCartButton onClick={() => this.addSetToDB("IKO")}>ADD IKO CARD SET</AddToCartButton>
				<AddToCartButton onClick={() => this.addSetToDB("THB")}>ADD THB CARD SET</AddToCartButton>
				<AddToCartButton onClick={() => this.addSetToDB("ELD")}>ADD ELD CARD SET</AddToCartButton>
			</div>
		);
	};
}

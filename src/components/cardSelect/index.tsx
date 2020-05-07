import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";

import {ApplicationState} from "../../store";
import {Card} from "../../store/card/types";

import axios from "axios";
import Boner from "../cardTile";
const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: auto;
`;

const CardListItems = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface PropsFromState {
	loading: boolean;
	data: Card[];
	errors?: string;
}

interface propsFromDispatch {
	// fetchRequest: () => any;
}

type AllProps = PropsFromState & propsFromDispatch;

const CardSelect: React.FC<AllProps> = ({loading, errors, data
}) => {
	const [cards, setCards] = useState<Card[]>([]);

	const fetchData = async () => {
		try {
			const cards = await axios.get('http://localhost:5000/cards');
			// Success 🎉
			setCards(cards.data);
			console.log(cards);
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

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container>
			<CardListItems>
				{cards.map(item => {
					return <Boner item={item} key={item.id}/>;
				})}
			</CardListItems>
		</Container>
	);
};

const mapStateToProps = ({cards}: ApplicationState) => ({
	loading: cards.loading,
	errors: cards.errors,
	data: cards.data,
});

// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
// 	return {
// 		fetchRequest: () => {
// 			dispatch(fetchRequest());
// 		}
// 	};
// };

export default connect(mapStateToProps)(CardSelect);

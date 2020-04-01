import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { ApplicationState } from "../../store";
import { Inventory } from "../../store/inventory/types";
import { fetchRequest } from "../../store/inventory/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Card from "../card";

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
    data: Inventory[];
    errors?: string;
}

interface propsFromDispatch {
    fetchRequest: () => any;
}

type AllProps = PropsFromState & propsFromDispatch;

const CardSelect: React.FC<AllProps> = ({
    loading,
    errors,
    data,
    fetchRequest
}) => {
    useEffect(() => {
        fetchRequest();
    }, []);

    return (
        <Container>
            <CardListItems>
                {data.map(item => {
                    return <Card item={item} key={item.id}/>;
                })}
            </CardListItems>
        </Container>
    );
};

const mapStateToProps = ({ inventory }: ApplicationState) => ({
    loading: inventory.loading,
    errors: inventory.errors,
    data: inventory.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchRequest: () => {
            dispatch(fetchRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardSelect);

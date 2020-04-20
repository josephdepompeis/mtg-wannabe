import React from 'react';
import './App.css';
import {ConnectedRouter} from "connected-react-router";
import {ApplicationState} from "./store";
import {Store} from "redux";
import {Provider} from "react-redux";
import {ThemeProvider} from "styled-components";
import customTheme from "./theme";
import {History} from "history";
import Routes from "./routes";
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import Axios from 'axios';

interface MainProps {
  store: Store<ApplicationState>;
  history: History;
}

// boilerplate axios stuff copied from https://www.npmjs.com/package/axios-hooks
const axios = Axios.create({
    baseURL: 'http://localhost:5000',

});

const cache = new LRU({ max: 10 });

configure({ axios, cache });


const App: React.FC<MainProps> = ({ store, history }) => {
  return (
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
  );
};

export default App;

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

interface MainProps {
  store: Store<ApplicationState>;
  history: History;
}

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

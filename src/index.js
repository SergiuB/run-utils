import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import persistState from 'redux-localstorage';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import app from './modules/app';
import raceEquiv from './modules/race-equivalence';
import programBuilder from './modules/program-builder';
import racePrediction from './modules/race-prediction';

import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import 'bootstrap-grid';

const { App, Subapp } = app.components;
const { RaceEquivPage } = raceEquiv.components;
const { ProgramPage } = programBuilder.components;
const { RacePredictionPage } = racePrediction.components;

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const reduxLsSlicer = (paths) => (state) => ({
  ...state,
  app: app.slicer(state),
  raceEquiv: raceEquiv.slicer(state),
  racePrediction: racePrediction.slicer(state),
})

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    app: app.reducer,
    raceEquiv: raceEquiv.reducer,
    racePrediction: racePrediction.reducer,
    router: routerReducer,
  }),
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware, 
      middleware,
    ),
    persistState(null, { key: 'run-utils', slicer: reduxLsSlicer }),
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider>
        <App>
          <Subapp isDefault title='Race Equivalence' id='raceEquivalence' component={RaceEquivPage} />
          <Subapp title='Program Builder' id='programBuilder' component={ProgramPage}/>
          <Subapp title='Race Prediction' id='racePrediction' component={RacePredictionPage}/>
        </App>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

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

import App, { Subapp } from './containers/App';

import RaceEquivPage from './containers/RaceEquivPage';
import ProgramPage from './containers/ProgramPage';

import reducers from './reducers';

import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import 'bootstrap-grid';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const reduxLsSlicer = (paths) => (state) => ({
  ...state,
  app: {
    ...state.app,
    userData: null,
    isAuthenticating: false,
  },
  raceEquiv: {
    ...state.raceEquiv,
    savedPerformances: [],
  },
})

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware, 
      middleware
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
        </App>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

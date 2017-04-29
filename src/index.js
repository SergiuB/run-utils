import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import App from './containers/App';
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

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    // ...reducers,
    router: routerReducer
  }),
  composeWithDevTools(
    applyMiddleware(middleware)
  )
)

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <div>
        <Route exact={true} path='/' component={App} />
        <Route path='/:savedPerformances' render={({ match }) => {
          return <App savedPerformances={match.params.savedPerformances} />;
        } } />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

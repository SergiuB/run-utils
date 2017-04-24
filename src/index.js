import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './containers/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <Router>
    <div>
      <Route exact={true} path='/' component={App} />
      <Route path='/:vdotState' render={({ match, history }) => {
        return <App history={history} urlState={JSON.parse(decodeURI(match.params.vdotState))} />;
      } } />
    </div>
  </Router>,
  document.getElementById('root')
);

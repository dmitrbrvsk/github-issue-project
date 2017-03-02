import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import configureStore from './store/configureStore';
import {routes} from './routes.jsx'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

store.subscribe(() => {
  console.log(store.getState());
});


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App.jsx';
import IssuePage from './components/IssuePage.jsx';
import NotFound from './components/NotFound.jsx';

export const routes = (
  <div>
    <Route path='/'>
      <IndexRoute component={App}/>
      <Route path=':user/:repo/issues/:id' component={IssuePage} />
    </Route>
    <Route path='*' component={NotFound} />
  </div>
)
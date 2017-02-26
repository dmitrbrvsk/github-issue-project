import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App.jsx';
import IssuesPage from './components/IssuesPage.jsx';
import NotFound from './components/NotFound.jsx';

export const routes = (
  <div>
    <Route path='/'>
      <IndexRoute component={App}/>
      <Route path='/issues(/:id)' component={IssuesPage} />
    </Route>
    <Route path='*' component={NotFound} />
  </div>
)
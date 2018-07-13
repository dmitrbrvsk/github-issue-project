import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import App from './containers/App'
import IssuePage from './components/IssuePage'
import NotFound from './components/NotFound'

const AppRouter = ({ history }) => (
	<ConnectedRouter history={ history }>
		<Switch>
			<Route exact path='/' component={ App } />
			<Route path='/:user/:repo/issues/:id' component={ IssuePage } />
			<Route component={ NotFound } />
		</Switch>
	</ConnectedRouter>
)

export default AppRouter

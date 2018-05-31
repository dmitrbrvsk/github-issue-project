import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import IssuePage from './components/IssuePage'
import NotFound from './components/NotFound'

const routes = (
	<div>
		<Route path={ '/' }>
			<IndexRoute component={ App } />
			<Route path={ ':user/:repo/issues/:id' } component={ IssuePage } />
		</Route>
		<Route path={ '*' } component={ NotFound } />
	</div>
)

export default routes

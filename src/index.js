import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './store/configureStore'
import AppRouter from './AppRouter'

injectTapEventPlugin()

const store = configureStore()
const history = createHistory()

ReactDOM.render(
	<Provider store={ store }>
		<AppRouter history={ history } />
	</Provider>,
	document.getElementById('root')
)

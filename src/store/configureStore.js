import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import rootReducer from '../reducers'

export default function configureStore() {
	const logger = createLogger()
	const history = createHistory()
	const historyMiddleware = routerMiddleware(history)
	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunk, logger, historyMiddleware))
	)

	return store
}

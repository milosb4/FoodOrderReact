import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())));
}

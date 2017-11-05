import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import {reducer} from './reducers/index';
import thunkMiddleware from 'redux-thunk';
function configureStore(initialState) {
    return createStore(
        initialState,
        applyMiddleware(
            thunkMiddleware
        )
    )
}

ReactDOM.render(
    <Provider store={configureStore(reducer)}>
        <Router history={browserHistory} routes={routes} />
    </Provider>, document.querySelector('.container'));
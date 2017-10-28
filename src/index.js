import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import ChannelList from './components/channel_list';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import {reducer} from './reducers/index';
import thunkMiddleware from 'redux-thunk';
function configureStore(initialState) {
    return createStore(
        initialState,
        applyMiddleware(
            thunkMiddleware,
            promise
        )
    )
}

//const store = configureStore();
// const createStoreWithMiddleware = applyMiddleware(
//     thunkMiddleware,
//     promise
// )(createStore);

ReactDOM.render(
    <Provider store={configureStore(reducer)}>
      <ChannelList />
    </Provider>, document.querySelector('.container'));
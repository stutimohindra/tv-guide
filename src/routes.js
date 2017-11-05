import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './components/Login';
import ChannelList from './components/channel_List';

export default (
    <div>
        <Route path="/login" component={Login} />
        <Route path="/:name/:id" component={ChannelList}/>
        <Route path="/" component={ChannelList}/>
    </div>
)
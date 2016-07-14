/*
**/
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, route, hashHistory, Link} from 'react-router';
import Box from './components/Box';
import Register from './components/Registration';

Object.prototype.getattr = function(prop){
    return this[prop];
};

ReactDOM.render(
	<Router history={hashHistory}>
	<route path="/" component={Register}/>
	<route path="/dashboards/*" component={Box}/>
	</Router>,
    document.getElementById('app')
);

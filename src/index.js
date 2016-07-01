/**
**/
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, route, hashHistory, Link} from 'react-router';
import PromotionBox from './components/promotionBox';
import Register from './components/register'

Object.prototype.getattr = function(prop){
    return this[prop];
};


const Home = React.createClass({
    render: function() {
	return (
		<div>
		<span><Register/></span>
		</div>
	);
    }
});

ReactDOM.render(
	<Router history={hashHistory}>
	<route path="/" component={Register}/>
	<route path="/dashboards/*" component={PromotionBox}/>
	</Router>,
    document.getElementById('app')
);

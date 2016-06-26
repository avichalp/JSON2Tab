/**
*

*/
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, route, hashHistory, Link} from 'react-router';
import PromotionBox from './components/promotionBox';
import Register from './components/register'

var Dashboards = React.createClass({
    render: function() {
	const paths = JSON.parse(localStorage.getItem('paths')) || {};
	var renderList = [];
	for (var key in paths) {
	    console.log(key);
	    renderList.push(
		    <li key={key}><Link to={'/dashboards/' + key}>{key}</Link></li>
	    );
	}
	return (
		<div>
		{renderList}
	    </div>
	);
    }
});

ReactDOM.render(
	<Router history={hashHistory}>
	<route path="/" component={Register}/>
	<route path="/dashboards" component={Dashboards}/>
	<route path="/dashboards/promotions" component={PromotionBox}/>
	<route path="/dashboards/merchants" component={PromotionBox}/>
	</Router>,
    document.getElementById('app')
);

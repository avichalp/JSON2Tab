/**
**/
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, route, hashHistory, Link} from 'react-router';
import PromotionBox from './components/promotionBox';
import Register from './components/register'

const Dashboards = React.createClass({
    getInitialState: function() {
	return {dashboards: []}
    },
    
    render: function() {
	const paths = JSON.parse(localStorage.getItem('paths') || '{}');
	this.state.dashboards = Object.keys(paths);
	return (
		<div>
		{this.state.dashboards.map(function (p) {return <li key={p}><Link to={'/dashboards/' + p}>{p}</Link></li>})}
	    </div>	
	);
    }
});

const Home = React.createClass({
    render: function() {
	return (
		<div>
		<span><Register/></span>
		<span><Dashboards/></span>
		</div>
	);
    }
});

ReactDOM.render(
	<Router history={hashHistory}>
	<route path="/" component={Home}/>
	<route path="/dashboards/*" component={PromotionBox}/>
	</Router>,
    document.getElementById('app')
);

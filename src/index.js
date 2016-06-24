/**
*

*/
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, route, hashHistory} from 'react-router';
import PromotionBox from './components/promotionBox';
import Register from './components/register'

ReactDOM.render(
	<Router history={hashHistory}>
	<route path="/" component={Register}/>
	<route path="/promotions" component={PromotionBox}/>
	</Router>,
    document.getElementById('app')
);

/**
*

*/
import React from 'react';
import ReactDOM from 'react-dom';
import PromotionBox from './components/promotionBox';

ReactDOM.render(
	<div>
	<PromotionBox url="https://api.grofers.com/v2/search/feed/?page=0" pollInterval={200000000}
    authKey="c0915c6ad1e5720c764559053e16dc75fde6c70b456af3491a3ff135cfcdf0ff"/>
    </div>,
    document.getElementById('app')
);

/**
*

*/
import React from 'react';
import ReactDOM from 'react-dom';

var Promotion = React.createClass({
    render: function() {
	return (
	    
	    <tr className="promotions">
            <td>{this.props.promotion.promotion.headline_2}</td>
	    <td>{this.props.promotion.promotion.promotion_id}</td>
	    <td>{this.props.promotion.merchant.id}</td>
	    <td>{this.props.promotion.merchant.chain_id}</td>
	    </tr>
    );
  }
});

var PromotionBox = React.createClass({
    loadPromotionsFromServer: function() {
	fetch(this.props.url, {
	    'method': 'GET',
	    headers: new Headers({
		'Content-Type': 'Application/Json',
		'auth_key': this.props.authKey
	    })
	})
	    .then((response) => response.json())
	    .then((response) => 
		this.setState({
		    data: response.feed.filter(o => o.type === 1)[0].objects
		}))
	    .error((err) => console.log(err));
    },

    getInitialState: function() {
	return {data: []};
    },

    componentDidMount: function() {
	this.loadPromotionsFromServer();
	setInterval(this.loadPromotionsFromServer, this.props.pollInterval);
    },
    
    render: function() {
	return (
		<div className="commentBox">
		<h1>Promotions</h1>
		<PromotionList data={this.state.data} />
		</div>
	);
    }
});


var PromotionList = React.createClass({
    render: function() {
	console.log(this.props.data);
	var commentNodes = this.props.data.map(function(promotion) {
	    return (
		    <Promotion promotion={promotion} key={promotion.promotion.promotion_id}>    
		    </Promotion>
	    );
	});
	return (
	    <table className="commentList">
	    <tr>
	    <th>name</th>
	    <th>promotion id</th>
	    <th>merchant id</th>
	    <th>chain id</th>
	    </tr>
	    <tbody>
		{commentNodes}
	    </tbody>
	    </table>
	);
    }
});

ReactDOM.render(
	<PromotionBox url="https://api.grofers.com/v2/search/feed/?lat=28.54282379999999&lon=77.23954789999999&page=0" pollInterval={200000000}
    authKey="c0915c6ad1e5720c764559053e16dc75fde6c70b456af3491a3ff135cfcdf0ff"/>,
    document.getElementById('app')
);


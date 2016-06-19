/**
*

*/

import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader';

const style = {
    table: {
	'border': '1px solid black',
	'width': '100%',
	'marginTop': '20px'
    },
    th: {
	'height': '50px',
	'textAlign': 'left'
    },
    td: {
	'border': '1px solid black',
	'height': '50px',
	'verticalAlign': 'bottom'
    },
    button: {
	go: {
	    'color': 'black',
	    'background': '#B9B9B9',
	    'borderRadius': '3px',
	    'borderColor': '#B9B9B9',
	    'marginLeft': '10px',
	    'marginBottom': '10px',
	    'borderStyle': 'hidden'
	}
    },
    input: {
	'marginLeft': '0px',
	'marginRight': '4px'
    },
    navbar: {
	'marginTop': '30px'
    }

};

var Promotion = React.createClass({
    render: function() {
	return (
		<tr className="promotions">
		<td style={style.td}>{this.props.promotion.promotion.headline_2}</td>
		<td style={style.td}>{this.props.promotion.promotion.promotion_id}</td>
		<td style={style.td}>{this.props.promotion.merchant.id}</td>
		<td style={style.td}>{this.props.promotion.merchant.chain_id}</td>
		</tr>
    );
  }
});

var PromotionBox = React.createClass({
    loadPromotionsFromServer: function() {
	this.setState({loaded: false});
	fetch(this.props.url + '&lat=' + this.state.lat + '&lon=' + this.state.lon, {
	    'method': 'GET',
	    headers: new Headers({
		'Content-Type': 'Application/Json',
		'auth_key': this.props.authKey
	    })
	})
	    .then((response) => response.json())
	    .then((response) =>
		this.setState({
		    data: response.feed.filter(o => o.type === 1)[0].objects,
		    loaded: true
		}))
	    .catch((err) => console.log(err));
    },

    getInitialState: function() {
	return {
	    data: [],
	    lat: '28.4472372',
	    lon: '77.04061469999999',
	    loaded: false
	};
    },

    handleLatChange: function(evt) {
	this.setState({
	    lat: evt.target.value,
	    lon: this.state.lon
	});
    },

    handleLonChange: function(evt) {
	this.setState({
	    lat: this.state.lat,
	    lon: evt.target.value
	});
    },

    componentDidMount: function() {
	this.loadPromotionsFromServer();
    },

    render: function() {
	return (

		<div>

		<div style={style.navbar}>
		<span>Promotions at: </span>
		<input style={style.input} placeholder={this.state.lat} value={this.state.value} onChange={this.handleLatChange} />
		<input style={style.input} placeholder={this.state.lon} value={this.state.value} onChange={this.handleLonChange} />
		<button style={style.button.go} onClick={this.loadPromotionsFromServer}>Go!</button>
		</div>

		<div>
		<Loader loaded={this.state.loaded}>
		<PromotionList data={this.state.data} />
		</Loader>
		</div>

		</div>
	);
    }
});


var PromotionList = React.createClass({
    render: function() {
	var commentNodes = this.props.data.map(function(promotion) {
	    return (
		    <Promotion
		promotion={promotion}
		key={promotion.promotion.promotion_id}>
		    </Promotion>
	    );
	});
	return (
		<table style={style.table}>
		<tbody>
		<tr>
		<th style={style.th}>name</th>
		<th style={style.th}>promotion id</th>
		<th style={style.th}>merchant id</th>
		<th style={style.th}>chain id</th>
		</tr>
		</tbody>
		<tbody>
		{commentNodes}
	    </tbody>
		</table>
	);
    }
});

ReactDOM.render(
	<div>
	<PromotionBox url="https://api.grofers.com/v2/search/feed/?page=0" pollInterval={200000000}
    authKey="c0915c6ad1e5720c764559053e16dc75fde6c70b456af3491a3ff135cfcdf0ff"/>
    </div>,
    document.getElementById('app')
);

import React from 'react';
import Loader from 'react-loader';
import PromotionList from './promotionList';
import style from '../style';

export default React.createClass({

    loadPromotionsFromServer: function() {
	this.setState({loaded: false});
	var reqHeaders = new Headers();
	reqHeaders.append('Content-Type', 'Application/Json');
	reqHeaders.append('auth_key', this.state.authKey);
	fetch(this.state.url + this.state.queryString, {
	    'method': 'GET',
	    headers: reqHeaders
	})
	    .then((response) => response.json())
	    .then((response) =>
		this.setState({
		    data: response,
		    loaded: true
		}))
	    .catch((err) => console.log(err));
    },

    getUrl: function() {
	const paths = JSON.parse(localStorage.getItem('paths'));
	return paths[this.props.location.pathname.replace('dashboards', '').replace('/', '').replace('/', '')];
    },

    getInitialState: function() {
	return {
	    data: [],
	    queryString: '?lat=28.4472372&lon=77.04061469999999',
	    loaded: false,
	    url: this.getUrl(),
	    authKey: "c0915c6ad1e5720c764559053e16dc75fde6c70b456af3491a3ff135cfcdf0ff"
	};
    },

    handleQChange: function(evt) {
	this.setState({
	    queryString: '?' + evt.target.value,
	});
    },

    componentDidMount: function() {
	this.loadPromotionsFromServer();
    },

    render: function() {
	return (
		<div>
		<div style={style.navbar}>
		<h2>{this.props.location.pathname}</h2>
		<span>QueryString: </span>
		<input style={style.input} placeholder={this.state.queryString} value={this.state.value} onChange={this.handleQChange} />
		<button style={style.button.go} onClick={this.loadPromotionsFromServer}>Go!</button>
		</div>
		<div>
		<Loader loaded={this.state.loaded}>
		<PromotionList data={this.state.data} {...this.props}/>
		</Loader>
		</div>
		</div>
	);
    }
});

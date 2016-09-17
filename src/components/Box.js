import React from 'react';
import Loader from 'react-loader';
import List from './List';
import style from '../style';

const authKey = "c0915c6ad1e5720c764559053e16dc75fde6c70b456af3491a3ff135cfcdf0ff";


export default class Box extends React.Component {

    constructor(props, context) {
	super(props, context);
	this.state = {
	    data: [],
	    queryString: '?lat=28.4472372&lon=77.04061469999999',
	    loaded: false,
	    url: '',
	    authKey: authKey,
	    headers: {
		'auth_key': authKey
	    }
	};
	this.loadPromotionsFromServer = this.loadPromotionsFromServer.bind(this);
	this.getUrl = this.getUrl.bind(this);
	this.handleQChange = this.handleQChange.bind(this);
	this.handleHeaderKeyChange = this.handleHeaderKeyChange.bind(this);
	this.handleHeaderValueChange = this.handleHeaderValueChange.bind(this);
	this.addHeader = this.addHeader.bind(this);
    }

    componentDidMount() {
	this.loadPromotionsFromServer();
    }

    loadPromotionsFromServer() {
	this.setState({
	    loaded: false,
	    url: this.getUrl()
	});
	var reqHeaders = new Headers();
	reqHeaders.append('Content-Type', 'Application/Json');
	for (var k in this.state.headers) {
	    if (this.state.headers.hasOwnProperty(k)){
		reqHeaders.append(k, this.state.headers[k])
	    }
	}
	var finalUrl = 'http://192.168.99.100:8080/api/go?url=' + encodeURIComponent(this.state.url) + '&q=' + encodeURIComponent(this.state.queryString);
	console.log(finalUrl);
	fetch(finalUrl, {
	    method: 'GET',
	    headers: reqHeaders,
	})
	    .then((response) => response.json())
	    .then((response) => {
		this.setState({
		    data: response,
		    loaded: true
		})
	    })
	.catch((err) => console.log(err));
    }

    getUrl() {
	const paths = JSON.parse(window.localStorage.getItem('paths'));
	const pathKey = this.props.location.pathname
	.replace('dashboards', '')
	.replace('/', '')
	.replace('/', '');
	return paths[pathKey].url;
    }

    handleQChange(evt) {
	this.setState({
	    queryString: '?' + evt.target.value,
	});
    }

    handleHeaderKeyChange(evt) {
	this.setState({
	    'headerKey': evt.target.value
	});
    }

    handleHeaderValueChange(evt) {
	this.setState({
	    'headerValue': evt.target.value
	});
    }

    addHeader() {
	let headers = this.state.headers;
	headers[this.state.headerKey] = this.state.headerValue;
	this.setState({
	    headers: headers
	});
    }

    render() {
	return (
		<div>
		<div>
		<h2>
		{this.props.location.pathname}< /h2>
		<div>Headers

	    <input
	    placeholder={"auth_key"}
	    value={this.state.value}
	    onChange={this.handleHeaderKeyChange} />

	    <input
	    placeholder={this.state.headers.auth_key}
	    value={this.state.value}
	    onChange={this.handleHeaderValueChange} />

	    <button
	    onClick={this.addHeader}>Add< /button>
		</div>
		<span>QueryString: </span>

	    <input
	    placeholder={this.state.queryString}
	    value={this.state.value}
	    onChange={this.handleQChange} />

	    <button
	    onClick={this.loadPromotionsFromServer}>Go!< /button>

	    </div>
		<div>

	    <Loader
	      loaded={this.state.loaded}>
	    <List
		data={this.state.data}
	      {...this.props} />
	    </Loader>
	    </div>
	    </div>
	);
    }

}

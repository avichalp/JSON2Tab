import React from 'react';
import { Link } from 'react-router';
import style from '../style';
import '../css/main.css';
import NotificationSystem  from 'react-notification-system';

export default class Registration extends React.Component {

    constructor(props, context) {
	super(props, context);
	this.state = {
	    url: "api.grofers.com",
	    dashboards: []
	};
	this.handleUrlChange = this.handleUrlChange.bind(this);
	this.handleNameChange = this.handleNameChange.bind(this);
	this.handleRegister = this.handleRegister.bind(this);
	this.save = this.save.bind(this);
	this._validateUrl = this._validateUrl.bind(this);
	this._validateName = this._validateName.bind(this);
    }

    componentDidMount() {
	const paths = JSON.parse(localStorage.getItem('paths') || '{}');
	this.setState({
	    dashboards: Object.keys(paths)
	});
	this._notificationSystem = this.refs.notificationSystem;
	this._addNotification = this._addNotification.bind(this);
    }

    _addNotification(event, notifType, message) {
	event.preventDefault();
	switch (notifType) {
	case 'FAILURE':
	    this._notificationSystem.addNotification({
		message: message,
		level: 'error',
		position: 'tr',
		autoDismiss: 0
	    });
	    break;
	case 'SUCCESS':
	    this._notificationSystem.addNotification({
		message: message,
		level: 'success',
		position: 'tr'
	    })

	}

    }

     handleUrlChange(event) {
	 this.setState({url: event.target.value});
    }

    handleNameChange(event) {
	this.setState({name: event.target.value})
    }

    save(key, toPersist) {
	var paths = JSON.parse(localStorage.getItem('paths') || '{}');
	paths[key] = toPersist;
	localStorage.setItem('paths', JSON.stringify(paths));
    }
    _validateUrl() {
	var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	var match = re.test(this.state.url)
	if(match === false) {
	    return false;
	} else {
	    return true;
	}
    }

    _validateName() {
	if(this.state.name.length === 0){
	    return false;
	} else {
	    return true;
	}
    }

    handleRegister(event) {
	if (this._validateUrl() && this._validateName()) {
	    this.save(this.state.name, {url: this.state.url, columns: []});
	    const paths = JSON.parse(localStorage.getItem('paths') || '{}');
	    this.setState({
		dashboards: Object.keys(paths)
	    });
	    this._addNotification(event, "SUCCESS",
				  'Successfully registered');

	} else {
	    this._addNotification(event, "FAILURE",
				  'Failed to register. Either invalid name or url.');

	}

    }

    populateLinks(link) {
	return (
		<li style={style.liAnchor}
	    key={link}>
		<Link
	    to={'/dashboards/' + link}>{link}
	    </ Link>
		</li>
	);
    }

    render() {
	return (
		<div>
		<header style={style.header}> J2Tab</header>
		<div style={style.textContainer}>
		<input style={style.textBox} placeholder="Name eg: MerchantsAPI" value={this.state.value} onChange={this.handleNameChange} />
		<input style={style.textBox} placeholder="https://api.google.com/" value={this.state.value} onChange={this.handleUrlChange} />
		<button style={style.button}onClick={this.handleRegister}> </button>

	    </div>

		<div>{this.state.dashboards.map(this.populateLinks)}</div>
		<NotificationSystem ref="notificationSystem" style={style.notification}/>
		</div>

	);
    }

}

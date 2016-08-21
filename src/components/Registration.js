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

    _addNotification() {
	//event.preventDefault();
	this._notificationSystem.addNotification({
	    message: 'Notification message',
	    level: 'success'
	});
    }

     handleUrlChange(evt) {
	 this.setState({url: evt.target.value});
    }

    handleNameChange(evt) {
	this.setState({name: evt.target.value})
    }

    save(key, toPersist) {
	var paths = JSON.parse(localStorage.getItem('paths') || '{}');
	paths[key] = toPersist;
	localStorage.setItem('paths', JSON.stringify(paths));
    }
    _validateUrl() {
	var res = this.state.url
	    .match('/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g');

	if(res == null) {
	    return false;
	} else {
	    return true;
	}
    }

    _validateName() {
	if(this.state.name.length() === 0){
	    return false;
	} else {
	    return true;
	}
    }
    
    handleRegister() {
	if (this._validateUrl() && this._validateName()) {
	    this.save(this.state.name, {url: this.state.url, columns: []});
	    const paths = JSON.parse(localStorage.getItem('paths') || '{}');
	    this.setState({
		dashboards: Object.keys(paths)
	    });
	} else {
	    console.log('Invalid name or url');
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
		<NotificationSystem ref="notificationSystem" />
		</div>

	);
    }

}

import Immutable from 'immutable';
import React from 'react';
import { Link } from 'react-router';
import style from '../style';
import '../css/main.css';
import NotificationSystem  from 'react-notification-system';
import Radium from 'radium';


class ListItem extends React.Component {
    constructor(props, context) {
	super(props, context);
	this.state = {
	    showDeleteButtton: false
	};	
	this._handleMouseOver = this._handleMouseOver.bind(this);
	this._handleMouseLeave = this._handleMouseLeave.bind(this);
	this._stopPropogation = this._stopPropogation.bind(this);
    }

    _handleMouseOver(event) {
	console.log("mouse over");
	this.setState({
	    showDeleteButtton: true
	});
    }

    _handleMouseLeave(event) {			
	this.setState({
	    showDeleteButtton: false
	});
	console.log("mouse out");	
    }

    _stopPropogation(event) {
	console.log("stopped event propogation");
	event.stopPropagation();
    }
            
    render() {
	var link = this.props.link;
	if (this.state.showDeleteButtton) {
		
	    return (
		    <div style={style.itemContainer} onMouseLeave={this._handleMouseLeave}>
		    <li style={style.liAnchor} key={link} id={link} ref={(li)=>{this.listItem = li}}>
		    <Link className={'style.item'} ref={'deleteButton' + link} to={'/dashboards/' + link}
		onMouseOver={this._handleMouseOver}>{link}</ Link>		    
		    <button key={Math.random(100).toString()} style={style.deleteButton} onClick={() => this.props.deleteButtonClickHandler(link)}>X</button>
		    </li>
		    </div>);
	} else {
	    return  (
		    <div style={style.itemContainer} onMouseOut={this._handleMouseLeave}>
		    <li style={style.liAnchor} key={link} id={link} ref={(li)=>{this.listItem = li}} >		    
		    <Link className={'style.item'} ref={'deleteButton' + link} to={'/dashboards/' + link}
		onMouseOver={this._handleMouseOver}>{link}</ Link>		   
		    <button key={Math.random(100).toString()} style={style.deleteButtonHidden}>X</button>
		    </li>
		    </div>
	    );		
	}	
    }
}


class Registration extends React.Component {

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
	this.populateLinks = this.populateLinks.bind(this);
	this._validateUrl = this._validateUrl.bind(this);
	this._validateName = this._validateName.bind(this);
	this.deleteButtonClickHandler = this.deleteButtonClickHandler.bind(this);
    }

    componentDidMount() {
	const paths = JSON.parse(localStorage.getItem('paths') || '{}');
	this.setState({
	    dashboards: Object.keys(paths)
	});
	this._notificationSystem = this.refs.notificationSystem;
	this._addNotification = this._addNotification.bind(this);

    }

    deleteButtonClickHandler(dashboardToDelete) {
	console.log(this.state);
	var storedPaths = JSON.parse(localStorage.getItem('paths'));
	delete storedPaths[dashboardToDelete];
	localStorage.setItem('paths', JSON.stringify(storedPaths));
	this.setState({
	    dashboards: this.state.dashboards.filter(
		dashboard => dashboard !== dashboardToDelete
	    )
	});
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
	    });

	}

    }

     handleUrlChange(event) {
	 this.setState({url: event.target.value});
    }

    handleNameChange(event) {
	this.setState({name: event.target.value});
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
		<ListItem link={link} deleteButtonClickHandler={this.deleteButtonClickHandler} />
	);
    }

    render() {
	return (
		<div>
		<header style={style.header}> J2Tab</header>
		<div style={style.textContainer}>
		<input style={style.textBox} placeholder="Name eg: MerchantsAPI" value={this.state.value} onChange={this.handleNameChange} />
		<input style={style.textBox} placeholder="https://api.google.com/" value={this.state.value} onChange={this.handleUrlChange} />
		<button key="two" style={style.button}onClick={this.handleRegister}> </button>

	    </div>

		<div style={style.container}>{this.state.dashboards.map(this.populateLinks)}</div>
		<NotificationSystem ref="notificationSystem" style={style.notification}/>
		</div>

	);
    }

}





export default Registration;

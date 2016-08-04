import React from 'react';
import { Link } from 'react-router';
import style from '../style';

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
    }

    componentDidMount() {
	const paths = JSON.parse(localStorage.getItem('paths') || '{}');
	this.setState({
	    dashboards: Object.keys(paths)
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
    
    handleRegister() {
	this.save(this.state.name, {url: this.state.url, columns: []});
	const paths = JSON.parse(localStorage.getItem('paths') || '{}');
	this.setState({
	    dashboards: Object.keys(paths)
	});
    }

    populateLinks(link) {
	return (
	    <li
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
	    <div>
	    <input
	      style={style.input}
	      placeholder="Name"
	      value={this.state.value}
	      onChange={this.handleNameChange} />
	    <input
	      style={style.input}
	      placeholder="Api Endpoint"
	      value={this.state.value}
	      onChange={this.handleUrlChange} />
	    <button
	      style={style.button.go}
	      onClick={this.handleRegister}>Register </button>
	    </div>
	    <div>
	    {this.state.dashboards.map(this.populateLinks)}
	     </div>
	    </div>
	);
    }

}

import React from 'react';
import { Link } from 'react-router';
import style from '../style';


export default React.createClass({

    save: function(key, toPersist) {
	var paths = JSON.parse(localStorage.getItem('paths') || '{}');
	paths[key] = toPersist;
	localStorage.setItem('paths', JSON.stringify(paths));
    },

    getInitialState: function() {
	return {
	    url: "api.grofers.com",
	    dashboards: []
	}
    },

    handleUrlChange: function(evt) {
	this.setState({url: evt.target.value});
    },

    handleNameChange: function(evt) {
	this.setState({name: evt.target.value})
    },

    handleRegister: function() {
	this.save(this.state.name, this.state.url);
	const paths = JSON.parse(localStorage.getItem('paths') || '{}');
	this.setState({
	    dashboards: Object.keys(paths)
	});
    },

    componentDidMount: function() {
	const paths = JSON.parse(localStorage.getItem('paths') || '{}');
	this.setState({
	    dashboards: Object.keys(paths)
	});
    },

    render: function() {
	return (
		<div>
		<div>
		<input style={style.input} placeholder="Name" value={this.state.value} onChange={this.handleNameChange}/>
		<input style={style.input} placeholder="Api Endpoint" value={this.state.value} onChange={this.handleUrlChange}/>
		<button style={style.button.go} onClick={this.handleRegister}>Register</button>
		</div>
		<div>
		{this.state.dashboards.map(function (p) {return <li key={p}><Link to={'/dashboards/' + p}>{p}</Link></li>})}
	    </div>
		</div>
	);

    }
});

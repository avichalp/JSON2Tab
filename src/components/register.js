import React from 'react';
import style from '../style';

export default React.createClass({

    save: function(key, toPersist) {
	var paths = JSON.parse(localStorage.getItem('paths') || '{}');
	paths[key] = {url: toPersist};
	localStorage.setItem('paths', JSON.stringify(paths));
    },

    getInitialState: function() {
	return {
	    url: "api.grofers.com"
	}
    },

    handleUrlChange: function(evt) {
	this.setState({url: evt.target.value});
    },

    handleNameChange: function(evt) {
	this.setState({name: evt.target.value})
    },

    handleRegister: function() {
	this.save(this.state.name, this.state.url)
    },

    render: function() {
	return (
		<div>
		<input style={style.input} placeholder="Name" value={this.state.value} onChange={this.handleNameChange}/>
		<input style={style.input} placeholder="Api Endpoint" value={this.state.value} onChange={this.handleUrlChange}/>
		<button style={style.button.go} onClick={this.handleRegister}>Register</button>
		</div>
	);
    }
});

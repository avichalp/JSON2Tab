import d3 from 'd3';
import React from 'react';
import ReactFauxDom from 'react-faux-dom';
import style from '../style';

export default React.createClass({

    getInitialState: function() {
	return {
	    'tempColumnName': 'default',
	    'columnNames': [],
	    'objectPath': [],
	    'propertyPath': [],
	    'columnCounter': 0
	}
    },

    getColumnName: function(evt) {
	this.setState({'tempColumnName': evt.target.value});
    },

    getObjectPath: function(evt) {
	this.setState({
	    'objectPath': evt.target.value.split('.')
	});
    },

    getPropertyPath: function(evt) {
	this.setState({
	    'propertyPath': evt.target.value.split('.')
	});
    },

    deleteColumn: function(evt){
	d3.selectAll('#' + evt.id).remove();
	this.state.columnNames.pop(this.state.columnNames.indexOf(evt.name));
    },

    addColumnData: function() {
	this.state.columnCounter += 1;
	Object.prototype.getattr = function(prop){
	    return this[prop];
	};
	var table = d3.select('body').select('table')[0][0] ? d3.select('body').select('table') : d3.select('body').append('table');
	//ReactFauxDom.createElement('table');

	var thead = table.select('thead')[0][0] ?  table.select('thead'): table.append('thead');

	this.state.columnNames.push({
	    id: 'col' + this.state.columnCounter,
	    name: this.state.tempColumnName
	});
	var finalObject = this.props.data;
	this.state.objectPath.forEach(function(p) {
	    finalObject = finalObject.getattr(p);
	});

	thead
	    .selectAll('th')
	    .data(this.state.columnNames)
	    .enter()
	    .append('th')
	    .attr('id', function(column) {return column.id;})
	    .on('dblclick', this.deleteColumn)
	    .text(function (column) {return column.name;});

	var _rows = undefined;
	if (table.selectAll('tr')[0][0] === undefined){
	    _rows = table
		.selectAll('tr')
		.data(finalObject)
		.enter()
		.append('tr');
	} else {
	    _rows = table
		.selectAll('tr');
	}

	// create a cell in each row for each column
	var cells = _rows.selectAll('td')
	    .data(function(row) {
		return this.state.columnNames.map(function (column) {
		    var finalProp = row;
		    this.state.propertyPath.forEach(function (p){
			if (finalProp){
			    finalProp = finalProp.getattr(p);
			}
		    });
		    return {column: column, value: finalProp};
		}.bind(this));
	    }.bind(this))
	    .enter()
	    .append('td')
	    .attr('id', function(d) {return d.column.id;})
	    .text(function (d) { return d.value; });
    },

    render: function() {
	return (
		<div>
		<div>
		<input style={style.input} placeholder="Column Name" value={this.state.value} onChange={this.getColumnName}/>
		<input style={style.input} placeholder="feed.1.objects" value={this.state.value} onChange={this.getObjectPath}/>
		<input style={style.input} placeholder="promotion.promotion_id" value={this.state.value} onChange={this.getPropertyPath}/>
		<button style={style.button.go} onClick={this.addColumnData}>Add Column</button>
		</div>
		<div>
		</div>
		</div>
	);
    }

});

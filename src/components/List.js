import d3 from 'd3';
import React from 'react';
import ReactFauxDom from 'react-faux-dom';
import style from '../style';


export default class List extends React.Component {

    constructor(props, context) {
	super(props, context);
	this.state = {
	    'paths': {},
	    'tempColumnName': 'default',
	    'columnNames': [],
	    'objectPath': [],
	    'propertyPath': [],
	    'columnCounter': 0,
	    'finalObject': {}
	};
    }

    componentDidMount() {
	const paths = JSON.parse(localStorage.getItem('paths'));
	var pathKey = this.props.location.pathname
	    .replace('dashboards', '')
	    .replace('/', '')
	    .replace('/', '');
	var finalObject = this.props.data;
	if (paths[pathKey].objectPath) {
	    paths[pathKey].objectPath.forEach(function(p) {
		finalObject = finalObject.getattr(p);
	    });
	}
	this.setState({'paths': paths});

    }

    getColumnName(evt) {
	this.setState({'tempColumnName': evt.target.value});
    }

    getObjectPath(evt) {
	this.setState({
	    'objectPath': evt.target.value.split('.')
	});
    }

    getPropertyPath(evt) {
	this.setState({
	    'propertyPath': evt.target.value.split('.')
	});
    }

    deleteColumn(evt) {
	d3.selectAll('#col' + evt.id).remove();
	const paths = JSON.parse(localStorage.getItem('paths'));
	var pathKey = this.props.location.pathname
	    .replace('dashboards', '')
	    .replace('/', '')
	    .replace('/', '');
	paths[pathKey].columns = paths[pathKey].columns.filter((c) => c.id !== evt.id);
	localStorage.setItem('paths', JSON.stringify(paths));
	this.setState({'paths': paths});
	this.state.columnNames.pop(this.state.columnNames.indexOf(evt.name));
    }

    addColumnData() {
	this.state.columnNames.push({
	    id: 'col' + this.state.columnCounter,
	    name: this.state.tempColumnName
	});
	var finalObject = this.props.data;
	this.state.objectPath.forEach(function(p) {
	    finalObject = finalObject.getattr(p);
	});
	this.setState({
	    columnCounter: this.state.columnCounter += 1,
	    columnNames: this.state.columnNames,
	    finalObject: finalObject
	});
	var toSave = {
	    id: this.state.columnCounter,
	    name: this.state.tempColumnName,
	    propertyPath: this.state.propertyPath
	}
	var paths = JSON.parse(localStorage.getItem('paths'));
	var pathKey = this.props.location.pathname
	    .replace('dashboards', '')
	    .replace('/', '')
	    .replace('/', '');

	paths[pathKey]['objectPath'] = this.state.objectPath;
	paths[pathKey]['columns'].push(toSave);
	localStorage.setItem('paths', JSON.stringify(paths));
	this.setState({'paths': paths});

    }

    render() {
	var pathKey = this.props.location.pathname
	    .replace('dashboards', '')
	    .replace('/', '')
	    .replace('/', '');

	var finalObject = this.props.data;
	if (this.state.paths[pathKey] && this.state.paths[pathKey].objectPath) {
	    this.state.paths[pathKey].objectPath.forEach(function(p) {
		finalObject = finalObject.getattr(p);
	    });
	    var columns = this.state.paths[pathKey].columns;
	} else {
	    columns = [];
	}
	var table = new ReactFauxDom.Element('table');

	if (d3.select('thead')[0][0]) {
	    var thead = d3.select('thead')
	} else {
	    var thead = d3.select('table').append('thead');
	}

	thead
	    .selectAll('th')
	    .data(columns)
	    .enter()
	    .append('th')
	    .attr('id', function(column) {return 'col' + column.id;})
	    .on('dblclick', this.deleteColumn)
	    .text(function (column) {return column.name;});

	d3.select('table')
	    .selectAll('tr')
	    .data(finalObject)
	    .enter()
	    .append('tr');

	d3.select('table')
	    .selectAll('tr')
	    .selectAll('td')
	    .data(function(row) {
		return columns.map(function (column) {
		    var finalProp = row;
		    column.propertyPath.forEach(function (p){
			if (finalProp){
			    finalProp = finalProp.getattr(p);
			}
		    });
		    return {column: column, value: finalProp};
		}.bind(this));
	    }.bind(this))
	    .enter()
	    .append('td')
	    .attr('id', function(d) {return 'col' + d.column.id;})
	    .text(function (d) { return d.value; });

	return (
	    <div>
	    <div>
	    <input
	    style={style.input}
	      placeholder="Column Name"
	      value={this.state.value}
	      onChange={this.getColumnName} />
	    <input
	      style={style.input}
	      placeholder="feed.1.objects"
	      value={this.state.value}
	      onChange={this.getObjectPath} />
	    <input
	      style={style.input}
	      placeholder="promotion.promotion_id"
	      value={this.state.value}
	      onChange={this.getPropertyPath} />
	    <button
	      style={style.button.go}
	      onClick={this.addColumnData}>Add Column</ button>
	    </div>
	    <div>{table.toReact()}</div>
	    </div>
	);
    }

}

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
    this.getColumnName = this.getColumnName.bind(this);
    this.getObjectPath = this.getObjectPath.bind(this);
    this.getPropertyPath = this.getPropertyPath.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.addColumnData = this.addColumnData.bind(this);
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
    this.setState({'objectPath': evt.target.value.split('.')});
  }

  getPropertyPath(evt) {
    this.setState({'propertyPath': evt.target.value.split('.')});
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
    };
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
    var thead, columns;
    var finalObject = this.props.data;
    var pathKey = this.props.location.pathname
        .replace('dashboards', '')
        .replace('/', '')
        .replace('/', '');
    var table = new ReactFauxDom.Element('table');

    if (this.state.paths[pathKey] && this.state.paths[pathKey].objectPath) {
      this.state.paths[pathKey].objectPath.forEach(function(p) {
        finalObject = finalObject.getattr(p);
      });
      columns = this.state.paths[pathKey].columns;
    } else {
      columns = [];
    }

    if (d3.select('thead')[0][0]) {
      thead = d3.select('thead');
    } else {
      thead = d3.select('table').append('thead');
    }

    thead.selectAll('th')
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

        <div style={style.textContainer}>
        <form>
        <input style={style.textBox}  placeholder="Column Name" value={this.state.value} onChange={this.getColumnName} required/>
        <input style={style.textBox} placeholder="feed.1.objects" value={this.state.value} onChange={this.getObjectPath} required/>
        <input style={style.textBox} placeholder="promotion.promotion_id" value={this.state.value} onChange={this.getPropertyPath} required/>
        <button style={style.button} onClick={this.addColumnData}></ button>
        </form>
        </div>

        <div>{table.toReact()}</div>
        </div>
    );
  }

}

import React from 'react';
import Loader from 'react-loader';
import List from './List';
import style from '../style';


export default class Box extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.endpoint = 'http://localhost:8080/api/go';
    this.state = {
      data: [],
      url: this.getData('url'),
      headers: this.getData('headers') || [{}],
      query: this.getData('query') || [{}],
      loaded: false,
      queryCount: this.getData('query').length || 0,
      headerCount: this.getData('headers').length || 0
    };

    this.loadPromotionsFromServer(this.getData('url'));

    this.createQueryString = this.createQueryString.bind(this);
    this.loadPromotionsFromServer = this.loadPromotionsFromServer.bind(this);
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.addInputObject = this.addInputObject.bind(this);
    this.deleteInputObject = this.deleteInputObject.bind(this);
    this.prettyPrintHeaders = this.prettyPrintHeaders.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderList = this.renderList.bind(this);

  }

  createQueryString() {
    var queryString = '?';
    this.state.query
      .filter(q => q.key && q.value)
      .forEach(q => {
        queryString = queryString + q.key + '=' + q.value + '&';
      });
    queryString = queryString.substring(0, queryString.length - 1);

    return queryString;
  }

  loadPromotionsFromServer(endPoint) {
    this.setState({loaded: false});
    var reqHeaders = new Headers();
    var queryString = this.createQueryString();
    reqHeaders.append('Content-Type', 'Application/Json');
    this.state.headers
      .filter(h => h.key && h.value)
      .forEach(h => reqHeaders.append(h.key, h.value));

    var finalUrl = this.endpoint + '?url=' +
        encodeURIComponent(endPoint) +
        '&q=' + encodeURIComponent(queryString);

    fetch(finalUrl, {
      method: 'GET',
      headers: reqHeaders
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({data: response, loaded: true});
      })
      .catch((err) => console.log(err));
  }

  getData(key) {
    const paths = JSON.parse(window.localStorage.getItem('paths'));
    const pathKey = this.props.location.pathname
          .replace('dashboards', '')
          .replace('/', '')
          .replace('/', '');
    return paths[pathKey][key];
  }

  setData(inputType) {
    const paths = JSON.parse(window.localStorage.getItem('paths'));
    const pathKey = this.props.location.pathname
          .replace('dashboards', '')
          .replace('/', '')
          .replace('/', '');
    paths[pathKey][inputType] = this.state[inputType];
    localStorage.setItem('paths', JSON.stringify(paths));
  }

  /**
   * inputType: "query" or "headers". There are two types of inputs.
   * inputObject: Object of either query or header.
   * changeType: Change can be in either `key` or `value` of either headers or query input objects.
   */
  handleChange(evt, inputType, inputObject, changeType) {
    this.state[inputType].forEach(function(q) {
      if (q.id === inputObject.id) {
        q[changeType] = evt.target.value;
      }
    });    
    inputObject['changeType'] = evt.target.value;
    // wtire to localStorage
    this.setData(inputType);
    this.setState({...this.state});
  }

  addInputObject(inputType, counter) {
    this.state[inputType].push({
      id: ++this.state[counter]
    });
    this.setState({...this.state});
  }

  deleteInputObject(inputObject, inputType) {
    console.log(inputObject, inputType)
    console.log(this.state)
    var selectedInputObject = this.state[inputType].filter(input => input.id === inputObject.id);

    if (selectedInputObject) {
      this.state[inputType].splice(this.state[inputType].indexOf(selectedInputObject), 1);
      this.setData(inputType);
      this.setState({...this.state});
    }

  }

  renderInput(input, inputType) {
    console.log(this.state);
    return (
      <div key={input.id}>
        <input style={style.textBox} placeholder={input.key}
               value={input.key} onChange={(event) => this.handleChange(event, inputType, input, 'key')} />
        <input style={style.textBox} id={input} placeholder={input.value}
               value={input.value} onChange={(event) => this.handleChange(event, inputType, input, 'value')} />
        <button style={style.deleteButton} onClick={() => this.deleteInputObject(input, inputType)}>X</button>
      </div>
    );
  }

  prettyPrintHeaders(headerText) {
    return (<div>{headerText}</div>);
  }

  renderList() {
    if (this.state.data) {
      return <List data={this.state.data} {...this.props} />;
    } else {
      return <Loader loaded={true}> </Loader>;
    }
  }

  render() {
    return (
      <div>
        <div><header style={style.header}>{this.props.location.pathname}</header></div>
        <section style={style.section}>
          <div style={style.inputContainer}>
            <div style={style.smallTextContainer}>
              <div style={style.inputTitle}>Query</div>
              <div style={style.queryString}>{this.state.url + this.createQueryString()}</div>
              {this.state.query.map(queryInput => this.renderInput(queryInput, 'query'))}
              <button style={style.button} onClick={() => this.addInputObject('query', 'queryCount')}>Add Query String< /button>
            </div>
            <div style={style.smallTextContainer}>
              <div style={style.inputTitle}>Headers</div>
              <div style={style.queryString}>
                {this.state.headers.filter(h => h.key && h.value).map(h => h.key + ": " + h.value).map(this.prettyPrintHeaders)}
              </div>
              {this.state.headers.map(key => this.renderInput(key, 'headers'))}
              <button style={style.button} onClick={() => this.addInputObject('headers', 'headerCount')}>Add Header< /button>
            </div>        
            <div style={style.goButtonContainer}>
              <button style={style.button} onClick={() => this.loadPromotionsFromServer(this.state.url)}>GO< /button>
            </div>
          </div>
        </section>
        <section style={style.section}>
          <div>
            <Loader loaded={this.state.loaded}>
              {this.renderList()}
            </Loader>
          </div>
        </section>
      </div>
    );
  }

}

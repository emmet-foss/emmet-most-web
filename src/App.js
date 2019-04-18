import React, { Component } from 'react';
import emmetAPI from './emmetAPI';
import './App.css';

class App extends Component {
  state = {
    response: '',
    name: '',
    location: '',
    responseToPost: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await emmetAPI.fetchUrl('/api/v1/stores');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await emmetAPI.fetchUrl('/api/v1/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: this.state.name, 
        location: this.state.location
      }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Store Name:</strong>
          </p>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <p>
            <strong>Store Location:</strong>
          </p>
          <input
            type="text"
            value={this.state.location}
            onChange={e => this.setState({ location: e.target.value })}
          />
          <p>
            <button type="submit">Submit</button>
          </p>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;

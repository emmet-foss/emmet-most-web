import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './CreateForm.css';

class CreateForm extends Component {
  state = {
    response: [],
    name: '',
    location: '',
    responseToPost: '',
    collapsed: false,
  };

  render() {
    return (
      < div className="App">
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

export default CreateForm;

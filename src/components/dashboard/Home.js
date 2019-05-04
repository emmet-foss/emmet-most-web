import React, { Component } from 'react';
import Cookies from 'js-cookie';

import emmetAPI from '../../emmetAPI';

import 'antd/dist/antd.css';
import './Home.css';

class Home extends Component {
  state = {
    response: [],
    username: '',
    password: '',
    responseToPost: '',
    collapsed: false,
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.stores }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.callApi()
      .then(res => this.setState({ response: res.stores }))
      .catch(err => console.log(err));
    }
  }

  callApi = async () => {
    const cookie = Cookies.get('token');
    console.log('cookie', cookie)

    const response = await emmetAPI.getUrl('/api/v1/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': cookie 
      }
    })
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
        <p>{this.state.responseToPost}</p>
    );
  }
}

export default Home;

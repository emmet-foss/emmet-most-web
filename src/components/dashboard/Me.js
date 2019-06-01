import React, { Component } from 'react';
import Cookies from 'js-cookie';

import emmetAPI from '../../emmetAPI';

import 'antd/dist/antd.css';
import './Home.css';

class Home extends Component {
  state = {
    response: [],
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        console.log('res', res)
        this.setState({ response: res.user.email })
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.callApi()
      .then(res => {
        console.log('res', res)
        this.setState({ response: res.user.email })
      })
      .catch(err => console.log(err));
    }
  }

  callApi = async () => {
    const token = Cookies.get('token');
    console.log('token', token)

    const response = await emmetAPI.getUrl(`/api/v1/me?token=${token}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    })
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('body', body)
    return body;
  };

  render() {
    return <p style={{color: 'black'}}>{this.state.reponse}</p>
  }
}

export default Home;

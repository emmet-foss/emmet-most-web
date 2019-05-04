import React, { Component } from 'react';
import emmetAPI from '../../emmetAPI';
import {
  Form, Input, Button,
} from 'antd';
import 'antd/dist/antd.css';
import './CreateForm.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password: '',
      response: [],
      responseToPost: '',
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    emmetAPI.fetchUrl('/api/v1/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: this.state.username, 
        password: this.state.password,
      }),
    })
    .then(res => {
      console.log('token', res.token)
      if (res.status === 200) {
        this.props.history.push('/me');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label="Username:"
        >
          <Input
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Password"
        >
          <Input
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Login</Button>
          <p>{this.state.responseToPost}</p>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import emmetAPI from '../../emmetAPI';
import {
  Form, Input, Button,
} from 'antd';
import 'antd/dist/antd.css';
import './CreateForm.css';

class CreateForm extends Component {
  state = {
    response: [],
    name: '',
    location: '',
    description: '',
    responseToPost: '',
    collapsed: false,
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
        location: this.state.location,
        description: this.state.description
      }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
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
          label="Store Name:"
        >
          <Input
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Location"
        >
          <Input 
            value={this.state.location}
            onChange={e => this.setState({ location: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Description"
        >
          <Input 
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
          <p>{this.state.responseToPost}</p>
        </Form.Item>
      </Form>
    );
  }
}

export default CreateForm;

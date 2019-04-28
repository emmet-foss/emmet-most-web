import React, { Component } from 'react';
import emmetAPI from '../../emmetAPI';
import {
  Form, Input, Button,
} from 'antd';
import 'antd/dist/antd.css';
import './CreateForm.css';

class CreateMenuItem extends Component {
  state = {
    response: [],
    name: '',
    location: '',
    responseToPost: '',
    collapsed: false,
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { storeId, menuId } = this.props.match.params;
    const response = await emmetAPI.fetchUrl(`/api/v1/stores/${storeId}/menus/${menuId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: this.state.name
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
          label="Menu Item Name:"
        >
          <Input
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
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

export default CreateMenuItem;

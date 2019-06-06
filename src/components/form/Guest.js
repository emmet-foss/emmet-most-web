import React, { Component } from 'react';
import {
  Form, Input, Button,
} from 'antd';
import 'antd/dist/antd.css';
import './CreateForm.css';

class Guest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name : '',
      email: '',
      response: [],
      responseToPost: '',
    };
    this.validateGuest = this.validateGuest.bind(this);
  }

  /*
   * Validate inputted community name
   */
  validateGuest = (rule, value, callback) => {
    if (!value) {
      callback();
      return;
    }
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        localStorage.setItem('name', this.state.name);
        localStorage.setItem('email', this.state.email);
        localStorage.removeItem('guest_id')
    
        this.setState({ responseToPost: "User info saved." })
      }
    });

  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
          label="Name:"
        >
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: 'Name is required.',
            },
          ],
        })(
          <Input
            onChange={e => this.setState({ name: e.target.value })}
          />
        )}
        </Form.Item>
        <Form.Item
          label="Email:"
        >
        {getFieldDecorator('email', {
          rules: [
            {
              required: true,
              message: 'Email is required.',
            },
          ],
        })(
          <Input
            onChange={e => this.setState({ email: e.target.value })}
          />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Save</Button>
          <p>{this.state.responseToPost}</p>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({})(Guest);

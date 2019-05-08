import React, { Component } from 'react';
import Cookies from 'js-cookie';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Avatar,
  Col,
  List,
  Row,
  Statistic,
} from 'antd';

import emmetAPI from '../../emmetAPI';

import 'antd/dist/antd.css';
import './List.css';

class Checkout extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    cart_items: [],
    name: '',
    location: '',
    responseToPost: '',
    collapsed: false,
  };

  componentDidMount() {
    this.getCheckoutItems()
      .then(res => this.setState({ cart_items: res.cart_items }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.getCheckoutItems()
        .then(res => this.setState({ cart_items: res.cart_items }))
        .catch(err => console.log(err));
    }
  }

  getCheckoutItems = async () => {
    const token = Cookies.get('token');
    const response = await emmetAPI.getUrl(`/api/v1/checkout?token=${token}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const { cart_items } = this.state;

    return (
      <div className="wrap">
        <div className="extraContent">
          <Row>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Statistic value="Here are your orders for checkout:" />
              <List
                itemLayout="horizontal"
                bordered
                size="large"
                dataSource={cart_items}
                renderItem={item => (
                  <List.Item
                    key={item._id}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={item.name}
                    />
                    {item.quantity}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(Checkout);

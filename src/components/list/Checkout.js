import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Avatar,
  Button,
  Col,
  List,
  message,
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
    const guest_id = localStorage.getItem('guest_id');
    const response = await emmetAPI.getUrl(`/api/v1/checkout/${guest_id}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleConfirmCheckout = async () => {
    const guest_id = localStorage.getItem('guest_id');
    emmetAPI.fetchUrl(`/api/v1/checkout/${guest_id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "guest"
      }),
    })
    .then(res => {
      console.log('res', res)
      if (res.status === 200) {
        message.success('Items successfully checked out. Please wait for your orders to be handed over to you on your visit.');
        this.setState({ cart_items: [] })
        console.log('res', res)
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error checking out.');
    });
  };

  render() {
    const { cart_items } = this.state;

    return (
      <div className="wrap">
        <div className="extraContent">
          <Row>
            <Col xs={24} sm={24} md={24} lg={12}>
              {(cart_items && cart_items.length === 0) ?
                <Statistic value="No checked out orders yet." />
              :
                <div>
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
                  <div>
                    <Button
                      type="primary"
                      onClick={this.handleConfirmCheckout}
                    >
                      Confirm checkout
                    </Button>
                  </div>
                </div>
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(Checkout);

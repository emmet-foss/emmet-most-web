import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Icon, List, Avatar, Card, InputNumber, Form } from 'antd';
import emmetAPI from '../../emmetAPI';
import 'antd/dist/antd.css';
import './List.css';

const { Meta } = Card;

class Checkout extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    response: [],
    name: '',
    location: '',
    responseToPost: '',
    collapsed: false,
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.menu_items }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.callApi()
        .then(res => this.setState({ response: res.menu_items }))
        .catch(err => console.log(err));
    }
  }

  callApi = async () => {
    const { storeId } = this.props.match.params;
    const response = await emmetAPI.getUrl(`/api/v1/orders/${storeId}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('body', body)
    return body;
  };

  render() {
    const menu_items = this.state.response || [];
    console.log('menu_items', menu_items)

    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={menu_items}
          renderItem={item => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.menu_item}</a>}
                description={item.name}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default withRouter(Checkout);

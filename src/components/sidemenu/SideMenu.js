import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './SideMenu.css';

const { Sider } = Layout;

class SideMenu extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  onClick = (e) => {
    this.props.history.push(e.key);
  }

  render() {
    return (
      <Sider
        collapsible
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" onClick={this.onClick}>
          <Menu.Item key="/">
            <Icon type="home" /><span>Home</span>
          </Menu.Item>
          <Menu.Item key="/stores">
            <Icon type="shop" /><span>Stores</span>
          </Menu.Item>
          <Menu.Item key="/menus">
            <Icon type="book" /><span>Menus</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SideMenu);

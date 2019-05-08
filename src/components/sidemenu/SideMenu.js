import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { NavLink } from 'react-router-dom';
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
    const { location } = this.props;
    return (
      <Sider
        breakpoint="xl"
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          onClick={this.onClick}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            <NavLink to="/">
              <Icon type="home" /><span>Home</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/stores">
            <NavLink to="/stores">
              <Icon type="shop" /><span>Stores</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/checkout">
            <NavLink to="/checkout">
              <Icon type="shopping-cart" /><span>Checkout</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/me">
            <NavLink to="/me">
              <Icon type="user" /><span>Me</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/login">
            <NavLink to="/login">
              <Icon type="lock" /><span>Login</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SideMenu);

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './SideMenu.css';

const { Sider } = Layout;

const SideMenu = () => {
  return (
    <Sider
      collapsible
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1">
          <Icon type="home" /><Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" /><Link to="/stores">Stores</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideMenu;

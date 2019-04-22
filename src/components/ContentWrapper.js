import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Layout, Button } from 'antd';
import 'antd/dist/antd.css';
import './ContentWrapper.css';
import StoreList from './list/StoreList';
import SideMenu from './sidemenu/SideMenu';
import CreateForm from './form/CreateForm';

const {
  Header, Content, Footer,
} = Layout;

class ContentWrapper extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const isAdd = this.props.location.pathname.indexOf('new') >= 0;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout>
          <Header style={{ background: '#fff', padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/stores/new">
              <Button type="primary" disabled={isAdd}>Add Store</Button>
            </Link>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route exact path="/stores/new" component={CreateForm} />
              <Route exact path="/stores" component={StoreList} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(ContentWrapper);

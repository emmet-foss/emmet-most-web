import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Layout, Button } from 'antd';
import 'antd/dist/antd.css';
import './ContentWrapper.css';
import { StoreList, MenuList } from './list';
import SideMenu from './sidemenu/SideMenu';
import CreateForm from './form/CreateForm';
import CreateMenu from './form/CreateMenu';

const {
  Header, Content,
} = Layout;

class ContentWrapper extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const isAdd = this.props.location.pathname.indexOf('new') >= 0;
    const newUrl = this.props.location.pathname + '/new'

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout>
          <Header style={{ background: '#fff', padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <Link to={newUrl}>
              <Button type="primary" disabled={isAdd}>Add</Button>
            </Link>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route exact path="/stores/new" component={CreateForm} />
              <Route exact path="/stores" component={StoreList} />
              <Route exact path="/stores/:storeId/menus" component={MenuList} />
              <Route exact path="/stores/:storeId/menus/new" component={CreateMenu} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(ContentWrapper);

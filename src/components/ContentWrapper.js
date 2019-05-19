import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Layout, Button, Icon } from 'antd';

import { Stores, Menus, MenuItems, Checkout } from './list';
import { CreateForm, CreateMenu, CreateMenuItem, Login, Guest } from './form';
import { Home } from './dashboard';
import SideMenu from './sidemenu/SideMenu';

import 'antd/dist/antd.css';
import './ContentWrapper.css';

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
    const isStore = this.props.location.pathname.indexOf('/stores') === 0;
    const isOrder = this.props.location.pathname.indexOf('/orders') === 0;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout>
          <Header style={{ background: '#fff', padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
            {isStore &&
              <Link to={newUrl}>
                <Button type="primary" disabled={isAdd}>Add</Button>
              </Link>
            }
            {isOrder &&
              <Link to="/checkout">
                <Button type="primary">
                  <Icon type="shopping-cart"/>Checkout
                </Button>
                
              </Link>
            }
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route exact path="/" component={Home} />

              <Route exact path="/stores" component={Stores} />
              <Route exact path="/stores/new" component={CreateForm} />
              <Route exact path="/stores/:storeId/menus" component={Menus} />
              <Route exact path="/stores/:storeId/menus/new" component={CreateMenu} />
              <Route exact path="/stores/:storeId/menus/:menuId" component={MenuItems} />
              <Route exact path="/stores/:storeId/menus/:menuId/new" component={CreateMenuItem} />

              <Route exact path="/guest" component={Guest} />
              <Route exact path="/checkout" component={Checkout} />

              <Route exact path="/login" component={Login} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(ContentWrapper);

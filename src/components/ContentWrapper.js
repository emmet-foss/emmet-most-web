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

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

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
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(ContentWrapper);

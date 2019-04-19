import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker, Layout, Menu, Breadcrumb, Icon } from 'antd';
import emmetAPI from './emmetAPI';
import 'antd/dist/antd.css';
import './App.css';

const {
  Header, Content, Footer, Sider,
} = Layout;

class App extends Component {
  state = {
    response: '',
    name: '',
    location: '',
    responseToPost: '',
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await emmetAPI.getUrl('/api/v1/stores');
    const body = await response.json();
    console.log('body', body)
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await emmetAPI.fetchUrl('/api/v1/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: this.state.name, 
        location: this.state.location
      }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <Link to="/stores">Stores</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <Link to="/menus">Menus</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon type="file" />
              <Link to="/orders">Orders</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

            < div className="App">
                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                  <p>
                    <strong>Store Name:</strong>
                  </p>
                  <input
                    type="text"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <p>
                    <strong>Store Location:</strong>
                  </p>
                  <input
                    type="text"
                    value={this.state.location}
                    onChange={e => this.setState({ location: e.target.value })}
                  />
                  <p>
                    <button type="submit">Submit</button>
                  </p>
                </form>
                <p>{this.state.responseToPost}</p>
                <DatePicker />
              </div>

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

export default App;

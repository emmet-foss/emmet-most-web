import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Layout, Menu, Icon, List, Avatar, Button } from 'antd';
import emmetAPI from '../emmetAPI';
import 'antd/dist/antd.css';
import './ContentWrapper.css';

const {
  Header, Content, Footer, Sider,
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

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ContentWrapper extends Component {
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

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.stores }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      console.log('call api')
      this.callApi()
      .then(res => this.setState({ response: res.stores }))
      .catch(err => console.log(err));
    }
  }

  callApi = async () => {
    const location = this.props.location.pathname.split('/')[1];
    const response = await emmetAPI.getUrl(`/api/v1/${location}`);
    const body = await response.json();
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
    const stores = this.state.response || [];

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
              <Link to="/stores">
                <Button>Stores</Button>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/stores/new">
              <Button type="primary">Add Store</Button>
            </Link>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={stores}
                renderItem={item => (
                  <List.Item
                    key={item.name}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.name} />}
                      title={<a href={item.href}>{item.location}</a>}
                      description={item.location}
                    />
                    {item.name}, {item.location}
                  </List.Item>
                )}
              />
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

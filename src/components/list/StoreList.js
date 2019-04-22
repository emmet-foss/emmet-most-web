import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Icon, List, Avatar } from 'antd';
import 'antd/dist/antd.css';
import './StoreList.css';

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

class StoreList extends Component {
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

  render() {
    const stores = this.state.response || [];

    return (
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
    );
  }
}

export default withRouter(StoreList);

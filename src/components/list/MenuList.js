import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Icon, List, Avatar } from 'antd';
import emmetAPI from '../../emmetAPI';
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

class MenuList extends Component {
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

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.menus }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      console.log('call api')
      this.callApi()
      .then(res => this.setState({ response: res.menus }))
      .catch(err => console.log(err));
    }
  }

  callApi = async () => {
    const { storeId } = this.props.match.params;
    const response = await emmetAPI.getUrl(`/api/v1/stores/${storeId}/menus`);
    console.log('response', response)
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const { id } = this.props.match.params;
    console.log('this.props.storeId', id);
    const menus = this.state.response || [];

    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={menus}
          renderItem={item => (
            <List.Item
              key={item.name}
              actions={[<IconText type="edit" text="Edit" />, <IconText type="delete" text="Delete" />, <IconText type="like-o" text="Like" />]}
              extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.name} />}
                title={<a href={item.name}>{item.name}</a>}
                description={item.name}
              />
              {item.name}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default withRouter(MenuList);

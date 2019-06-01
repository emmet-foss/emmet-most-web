import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Icon, List, Avatar } from 'antd';
import emmetAPI from '../../emmetAPI';
import 'antd/dist/antd.css';
import './List.css';

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

const IconText = ({ type, text, id, url }) => (
  <span>
    <Link to={`/stores/${id}/${url}`}>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </Link>
  </span>
);

class Stores extends Component {
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
      .then(res => this.setState({ response: res.stores }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
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

  render() {
    const stores = this.state.response || [];
    const location = this.props.location.pathname.split('/')[1];

    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={stores}
          renderItem={item => (
            <List.Item
              key={item.name}
              actions={[
                <IconText type="book" id={item._id} url="menus" location={location} />,
                <IconText type="delete" id={item._id} url="remove" location={location} />,
                <IconText type="like-o" id={item._id} url="like" location={location} />
              ]}
              extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.name} />}
                title={item.name}
                description={item.location}
              />
              {item.description}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default withRouter(Stores);

import React, { Component } from 'react';
import { PageHeader, Statistic, Row, Col, Select, DatePicker } from 'antd';

import emmetAPI from '../../emmetAPI';

import 'antd/dist/antd.css';
import './Home.css';

const Option = Select.Option;

class Home extends Component {
  state = {
    locations: [],
    selectedLocation: '',
    menus: [],
    selectedMenu: '',
    loading: false,
  };

  componentDidMount() {
    this.getLocations()
      .then(res => this.setState({ locations: res.locations }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.getLocations()
      .then(res => this.setState({ locations: res.locations }))
      .catch(err => console.log(err));
    }
  }

  getLocations = async () => {
    const response = await emmetAPI.getUrl('/api/v1/stores/locations')
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getMenus = async (location) => {
    const response = await emmetAPI.getUrl(`/api/v1/stores/menus?location=${location}`)
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getStoreMenus = async (location) => {
    this.setState({ loading: true, selectedLocation: location });
    this.getMenus(location)
      .then(res => {
        this.setState({
          loading: false,
          menus: res.menus,
        })
      })
      .catch(err => console.log(err));
  };

  handleMenuSelect = async (selectedMenu) => {
    this.setState({ selectedMenu });
  }

  render() {
    const { locations, menus, loading, selectedLocation, selectedMenu } = this.state;
    const displayMenus = !loading && selectedLocation !== '';
    const displayDate = selectedMenu !== '';

    return (
      <PageHeader
        title="Welcome to Emmet Ordering System!"
      >
        <div className="wrap">
          <div className="extraContent">
            <Row>
              <Col span={12}>
                <Statistic value="Where will you be attending?" />
                <Select
                  showSearch
                  style={{ width: 150 }}
                  placeholder="Search a location"
                  dropdownMatchSelectWidth={false}
                  onChange={this.getStoreMenus}
                  value={selectedLocation}
                >
                  {locations.map(location => {
                    return <Option key={location} value={location}>{location}</Option>
                  })}
                </Select>
              </Col>
            </Row>
            {displayMenus &&
              <Row>
                <Col span={12}>
                  <Statistic value="What will you be ordering?" />
                  <Select
                    showSearch
                    style={{ width: 150 }}
                    placeholder="Choose a menu"
                    dropdownMatchSelectWidth={false}
                    onChange={this.handleMenuSelect}
                    value={selectedMenu}
                  >
                    {loading &&
                      <div>loading</div>
                    }
                    {!loading && menus.map(menu => {
                      return <Option key={menu._id} value={menu._id}>{menu.name}</Option>
                    })}
                  </Select>
                </Col>
              </Row>
            }
            {displayDate &&
              <Row>
                <Col span={12}>
                  <Statistic value="When will you be attending?" />
                  <DatePicker
                    placeholder="Select Time"
                  />
                </Col>
              </Row>
            }
          </div>
        </div>
      </PageHeader>

    );
  }
}

export default Home;

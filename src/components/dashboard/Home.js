import React, { Component } from 'react';
import { PageHeader, Statistic, Row, Col, Select, DatePicker, List } from 'antd';

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
    date_available: null,
    menus_available: [],
    loading: false,
    menuItemsQueried: false,
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

  handleLocationChange = async (location) => {
    this.setState({
      loading: true,
      selectedLocation: location,
      menus: [],
      selectedMenu: '',
      date_available: null,
      menus_available: [],
    });
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

  getMenuItemsAvailable = async (location, date_available) => {
    const { selectedMenu } = this.state
    const response = await emmetAPI.getUrl(`/api/v1/stores/menu_items?menuId=${selectedMenu}&location=${location}&date_available=${date_available}`)
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  queryAvailableMenuItems = async (date_available, dateString) => {
    this.setState({ date_available, menuItemsQueried: true });
    this.getMenuItemsAvailable(this.state.selectedLocation, dateString)
      .then(res => {
        this.setState({
          loading: false,
          menus_available: res.menuItems,
        })
      })
      .catch(err => console.log(err));
  };


  render() {
    const {
      locations,
      menus,
      loading,
      selectedLocation,
      selectedMenu,
      menus_available,
      menuItemsQueried,
    } = this.state;
    const displayMenus = !loading && selectedLocation !== '';
    const displayDate = selectedMenu !== '';

    let menusDisplay = null
    if (menus_available.length > 0) {
      menusDisplay = (
        <Row>
          <Col span={12}>
            <Statistic value="Here are the menus available:" />
            <List
              itemLayout="vertical"
              size="large"
              dataSource={this.state.menus_available}
              renderItem={menu => (
                <List.Item
                  key={menu.name}
                >
                  {menu.name}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      )
    } else {
      menusDisplay = (
        <Row>
          <Col span={12}>
            <Statistic value="No Menu Available." />
          </Col>
        </Row>
      )
    }

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
                  style={{ width: '100%' }}
                  placeholder="Search a location"
                  dropdownMatchSelectWidth={false}
                  onChange={this.handleLocationChange}
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
                    style={{ width: '100%' }}
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
                  <Statistic value="When will you attend?" />
                  <DatePicker
                    placeholder="Select Time"
                    onChange={this.queryAvailableMenuItems}
                  />
                </Col>
              </Row>
            }
            {menuItemsQueried && menusDisplay}
          </div>
        </div>
      </PageHeader>

    );
  }
}

export default Home;

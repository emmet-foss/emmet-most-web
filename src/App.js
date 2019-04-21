import React, { Component } from 'react';
import { Layout } from 'antd';
import SideMenu from './components/sidemenu/SideMenu';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />        
      </Layout>
    );
  }
}

export default App;

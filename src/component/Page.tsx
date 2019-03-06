import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Bread, SideBar } from './pageComponents';
import Article from '../pages/article';

const { Content, Sider } = Layout;

export default class Home extends Component {
  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        <Route component={Bread}></Route>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Route component={SideBar}></Route>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Route path="/article/:parent?/:name?" component={Article}></Route>
          </Content>
        </Layout>
      </Content>
    );
  }
}
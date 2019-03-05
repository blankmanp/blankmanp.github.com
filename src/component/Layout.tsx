import { Layout, Menu, Icon } from "antd";
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Bread, HeaderBar, SideBar } from './pageComponents';
import Article from '../pages/article';

const { Header, Content, Footer, Sider } = Layout;

export default class PageLayout extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <Route component={HeaderBar}></Route>
        </Header>
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
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}
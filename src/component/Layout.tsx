import { Layout } from "antd";
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HeaderBar } from './pageComponents';
import Home from './Home';
import Page from './Page';

const { Header, Footer } = Layout;

export default class PageLayout extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <Route component={HeaderBar}></Route>
        </Header>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route component={Page}></Route>
        </Switch>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}
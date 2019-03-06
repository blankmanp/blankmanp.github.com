import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Bread } from './pageComponents';

const { Content } = Layout;

export default class Home extends Component {
  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        <Route component={Bread}></Route>
        <Layout style={{ padding: '24px', background: '#fff' }}>
          HomePage -- 待编辑
        </Layout>
      </Content>
    );
  }
}
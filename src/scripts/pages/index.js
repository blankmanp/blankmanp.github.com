import React, { Component } from 'react';
import Layout from '../components/layout';
import { Card, List } from 'antd';

const ListItem = List.Item;

export default class Index extends Layout {
  renderBody() {
    return (
      <Card title="最近产出" style={{ width: '600px', margin: 'auto' }}>
        <List itemLayout="horizontal" dataSource={[]} />
      </Card>
    );
  }
}
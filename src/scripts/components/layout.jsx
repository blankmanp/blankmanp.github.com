import React, { Component } from 'react';
import { Row, Col } from 'antd';

export default class Layout extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={12} offset={2}>
                        <h1>blankmanp's blog</h1>
                    </Col>
                </Row>
            </div>
        )
    }
}
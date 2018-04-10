import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, Menu, Icon } from 'antd';
import './layout.less'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class Layout extends Component {

    static propTypes = {
        current: PropTypes.string
    }

    static defaultProps = {
        current: ""
    }

    state = {
        current: this.props.current || ""
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.current, nextProps.current)) {
            this.setState({ current: nextProps.current });
        }
    }

    render() {
        let { current } = this.state;
        return (
            <div>
                <Row>
                    <Col span={12} offset={2}>
                        <h1>blankmanp's blog</h1>
                    </Col>
                    <Col span={10}>
                        <Menu selectedKeys={[current]} mode="horizontal">
                            <MenuItem key="home">
                                <Icon type="home" /> Home
                            </MenuItem>
                            <MenuItem key="article">
                                <Icon type="file-text" /> Article
                            </MenuItem>
                            <MenuItem key="game">
                                <Icon type="laptop" /> Game
                            </MenuItem>
                            <MenuItem key="github">
                                <Icon type="github" /> Github
                            </MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </div>
        )
    }
}
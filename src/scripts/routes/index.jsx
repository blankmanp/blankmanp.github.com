import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from "react-router";
import _ from 'lodash';
import Layout from '../components/layout';

export default class Routes extends Component {
    render() {
        return [
            <Router history={browserHistory}>
                <Route path="/" component={Layout}></Route>
            </Router>
        ];
    }
}
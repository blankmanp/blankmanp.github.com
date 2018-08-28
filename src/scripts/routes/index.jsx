import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from "react-router";
import _ from 'lodash';
import Index from '../pages/index';

export default class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Index} />
            </Router>
        );
    }
}
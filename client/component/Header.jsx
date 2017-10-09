import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <header className="clearfix">
                <div className="col-md-8">
                    <h2>Blankmanp's Blog</h2>
                </div>
            </header>
        );
    }
}
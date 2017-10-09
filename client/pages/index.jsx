import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import Header from '../component/Header.jsx';
import Footer from '../component/Footer.jsx';
export default class Index extends Component {
    componentWillMount() {
        console.log('hello world');
    }
    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('body'))
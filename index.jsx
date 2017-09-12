import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Index extends Component {
    render() {
        return <p>test</p>;
    }
}

ReactDOM.render(<Index />, document.getElementById('test'))
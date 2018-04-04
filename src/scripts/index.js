import React, { Component } from 'react';
import Layout from './components/layout';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return <Layout />
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
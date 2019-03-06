import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import PageLayout from './component/Layout';

ReactDOM.render(
  <HashRouter>
    <PageLayout />
  </HashRouter>,
  document.getElementById('app')
);
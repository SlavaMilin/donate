import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
axios.defaults.baseURL = baseUrl;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

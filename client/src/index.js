import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DataProvider from './redux/store'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App/>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

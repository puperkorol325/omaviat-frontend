import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import authDataReducer from './store/authDataReducer';
import { Route, Routes, HashRouter as Router } from 'react-router-dom';
import selectedVideoReducer from './store/selectedVideoReducer';
import App from './App';
import AccountPage from './pages/AccountPage';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import PlayerPage from './pages/PlayerPage';
import RegPage from './pages/RegPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const reducer = combineReducers({ authDataReducer, selectedVideoReducer });
const store = createStore(reducer);

root.render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>
);


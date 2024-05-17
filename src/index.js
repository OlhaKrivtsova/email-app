import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import {UserContextProvider} from './store/auth-context';
import {EmailContextProvider} from './store/email-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <EmailContextProvider>
        <App />
      </EmailContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);

import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import {UserContextProvider} from './store/auth-context';
import {EmailContextProvider} from './store/email-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HashRouter>
      {/* <BrowserRouter>  */}
      <EmailContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </EmailContextProvider>
      {/* </BrowserRouter> */}
    </HashRouter>
  </StrictMode>
);

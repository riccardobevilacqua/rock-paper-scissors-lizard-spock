import React from 'react';

import { Client } from './components/Client/Client';
import logo from './logo.svg';
import './App.css';

export const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="App" data-testid="app">
      <Client />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

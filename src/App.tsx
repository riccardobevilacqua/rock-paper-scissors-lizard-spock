import React from 'react';

import { Client } from './components/Client/Client';
import './App.css';

export const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="App" data-testid="app">
      <Client />
    </div>
  );
}

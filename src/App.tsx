import React from 'react';

import { Client } from './components/Client/Client';

export const App: React.FunctionComponent<{}> = () => {
  return (
    <section className="section" data-testid="app">
      <div className="container">
        <Client />
      </div>
    </section>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import dataStore from './dataStore.js';
import Data from './Data.js'

ReactDOM.render(<App store = { dataStore } data = { Data } />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RewardManagementApp from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<RewardManagementApp />, document.getElementById('root'));

serviceWorker.unregister();

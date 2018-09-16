import { render } from 'inferno';
import { Provider } from 'inferno-redux';

import App from './app/App';
import { store } from './state_store';

import './phoenix_channels';
import './index.css';

render(
  <Provider store={ store }>
    <App />
  </Provider>
, document.getElementById('app'));

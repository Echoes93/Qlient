import { render } from 'inferno';
import { Provider } from 'inferno-redux';

import App from './App';
import { store } from './state_store';

import './phoenix_channels';


render(
  <Provider store={ store }>
    <App />
  </Provider>
, document.getElementById('app'));

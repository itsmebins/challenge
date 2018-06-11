import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router
} from 'react-router-dom'
import ReduxThunk from 'redux-thunk';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';
import TranslationContainer from './containers/TranslationContainer.js';
import RootReducer from './Reducers';
import App from './App.js';

const store = createStore(RootReducer,
      applyMiddleware(ReduxThunk));
addLocaleData([...en, ...fr, ...es]);
ReactDOM.render((
  <Router>
    <Provider store={store}>
      <TranslationContainer>
        <App />
      </TranslationContainer>
    </Provider>
  </Router>
), document.getElementById('root'))

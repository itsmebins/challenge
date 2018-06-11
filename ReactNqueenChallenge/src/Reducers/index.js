import { combineReducers } from 'redux';
import CoffeeGameReducer from './CoffeeGameReducer.js';
import LocaleReducer from './LocaleReducer.js';

const RootReducer = combineReducers({
  coffeeGame: CoffeeGameReducer,
  locale: LocaleReducer
});

export default RootReducer

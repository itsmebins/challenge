import React , { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import EndpointTest from './components/EndpointTest.js';
import CoffeeGame from './components/CoffeeGame.js';
import QueenGame from './components/QueenGame/QueenGame.js';

class Routes extends Component {
  render() {
    return (
     <div>
       <Switch>
         <Route exact path="/queen-game" name="NXN Queen game" component={QueenGame}/>
         <Route exact path="/coffee-game" name="Coffee game" component={CoffeeGame}/>
         <Route path="/" name="Home"  component={QueenGame}/>
       </Switch>
     </div>
    );
  }
}

export default Routes;

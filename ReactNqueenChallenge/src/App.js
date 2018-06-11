import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Routes from './routes.js';

class App extends Component {
  componentDidMount() {
  };
  render() {
    return (

      <BrowserRouter>
          <Routes />
       </BrowserRouter>
    );
  };
};

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, null )(App));

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FormattedMessage,
  injectIntl
} from 'react-intl';

class HomeHeader extends React.Component {

  openMobileHeaderMenu(e) {
    e.preventDefault();
    document.getElementById("mobileMenuDivId").classList.toggle('mobile-menu-hide');
    //DOMTokenList classNames = document.getElementById("mobileMenuDivId").classList;
  //  console.log(document.getElementById("mobileMenuDivId").classList);
    try{
      if(document.getElementById("mobileMenuDivId").classList.value === 'mobile-menu') {
          document.getElementById("mobileMenuBtn").innerHTML = 'X';
      } else {
          document.getElementById("mobileMenuBtn").innerHTML = '&#9776;';
      }
    } catch(e) {
        document.getElementById("mobileMenuBtn").innerHTML = '&#9776;';
    }

  };

render() {
  return (
    <div>
    <div id="deskTopMenuDiv" className="deskTopMenu">
    <header className="app-header navbar">
        <Link to={'/Home'} className="navbar-brand">
       </Link>
        <ul className="nav navbar-nav ml-auto home-header-navbar">
          <li className="nav-item">
            <Link to={'/'}>
              <FormattedMessage id='N_QUEEN_PROBLEM_SOLVE'/>
           </Link>
          </li>
          <li className="nav-item">
            <Link to={'/coffee-game'} >
              <FormattedMessage id='COFFEE_GAME'/>
           </Link>
          </li>
        </ul>
      </header>
    </div>
    <header className="mobile-header navbar">
      <div className="mean-container"
        style={{'overflowY': 'visible'}}>
        <div className="mean-bar">
            <div className="mobile-icon">
              <button id="mobileMenuBtn" className="meanmenu-reveal"
                style={{right: 0, left: 'auto',  'textAlign': 'center',
                 'textIndent': 0, 'FontAwesomeize': 18}} onClick={this.openMobileHeaderMenu.bind(this)}>
                 &#9776;</button>
            </div>

          <nav className="mean-nav">
            <div id="mobileMenuDivId" className="mobile-menu mobile-menu-hide">
              <ul className="nav navbar-nav ml-auto home-header-navbar">
                <li className="nav-item">
                  <Link to={'/endpoint-test'}>
                    <FormattedMessage id='ENDPOINT_TEST'/>
                 </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/coffee-game'} >
                    <FormattedMessage id='COFFEE_GAME'/>
                 </Link>
                </li>
              </ul>
            </div>
          </nav></div>

        </div>
        </header>
        </div>
    )
  }
  };

  export default injectIntl(HomeHeader);

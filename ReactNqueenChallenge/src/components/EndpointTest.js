import React, { Component } from 'react';
import {
  FormattedMessage,
  injectIntl
} from 'react-intl';
import { Alert } from 'reactstrap';
import HomeHeader from  '../components/Home/HomeHeader.js';
import { testEndpointAPI } from '../Util/APIUtils.js';

class EndpointTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successCase: true,
      APICallInProgress: false,
      serverMsg: '',
      msgColor: ''
    }
  };

  renderButton() {
    if(this.state.APICallInProgress  === true) {
      return(
        <button
          type="button" className='btn btn-info'
          onClick={()=> { ''}}>Please wait...</button>
      );
    }
    return(
      <button
        type="button" className='btn btn-primary'
        onClick={()=> {this.testEndpoint()}}>
        Test {this.state.successCase === true ? 200 : 400}
      </button>
    )
  };

  testEndpoint() {
   this.setState({ APICallInProgress: true});
    const currentStatus = this.state.successCase;
    const statusStr = currentStatus ? 200 : 400;
    testEndpointAPI(statusStr)
    .then((response) => {
    //  //console.log(response);
      if (response.ok) {
      //  console.warn('fetchJobList success111');
        const msg = ` Success....`
        this.setState({ APICallInProgress: false,
          serverMsg: msg, msgColor: 'success',
          successCase: !currentStatus});
      } else {
        const msg = ` Error...`
          this.setState({ APICallInProgress: false,
            serverMsg: msg, msgColor: 'danger',
            successCase: !currentStatus});
      }
    })
    .catch((error) => {
      this.setState({ APICallInProgress: false,  serverMsg:
        'no network connection...', msgColor: 'danger', successCase: !currentStatus});
    });

  };

  render() {
    return (
      <div className="app">
        <HomeHeader />
        <div className="animated fadeIn">
          <div className="card">
            <div className="card-header">
              <strong>  <FormattedMessage id='ENDPOINT_TEST'/></strong>
            </div>
            <div className="card-block">
              <div className="form-group row">
                <div className="col-md-3 col-sm-3">
                  <span>Edpoint test  : </span>
                  {this.state.successCase === true ? 200 : 400}
                 </div>
                <div className="col-md-3 col-sm-3">
                  {this.renderButton()}
                </div>
              </div>

              <div className="form-group row justify-content-center">
                {this.state.serverMsg !== '' ?
                  <Alert color={this.state.msgColor}>
                    {this.state.serverMsg}
                  </Alert> : null}

                <label className="col-md-4 col-sm-4 form-control-label justify-content-center">

                </label>
              </div>
            </div>

          </div>

        </div>
    </div>
    );
  }
}

export default injectIntl(EndpointTest);

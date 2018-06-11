import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { fetchLocaleMessage } from '../Util/MessageUtil.js';

class TranslationContainer extends Component {
  static propTypes = {
    locale: PropTypes.string,
  };

  render() {
    const locale = this.props.locale ? this.props.locale: 'en-US';
    const message = fetchLocaleMessage(locale);
    return (
      <IntlProvider locale={locale} messages={message}>
         { this.props.children }
      </IntlProvider>

    );
  }
}

const mapStateToProps = (state) => {
  return { locale : state.locale.localeValue }
};

export default connect(mapStateToProps)(TranslationContainer);

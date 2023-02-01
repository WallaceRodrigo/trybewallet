import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;

    return (
      <div>
        <h3 data-testid="email-field">{ `Email: ${email}` }</h3>
        <h3 data-testid="total-field">{ `Despesas Totais: ${0}` }</h3>
        <h3 data-testid="header-currency-field">{ `Moeda: ${'BRL'}` }</h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

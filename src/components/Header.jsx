import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;

    return (
      <div>
        <h3 data-testid="email-field">{ `Email: ${email}` }</h3>
        <h3>
          <span>Despesas Totais: </span>
          <span data-testid="total-field">
            {
              totalValue.toFixed(2) < 1 ? '0.00' : totalValue.toFixed(2)
            }
          </span>
        </h3>
        <h3 data-testid="header-currency-field">{ `Moeda: ${'BRL'}` }</h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.totalValue,
});

export default connect(mapStateToProps)(Header);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currencyAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currencyAPI());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  render() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          Valor
          <input
            type="number"
            data-testid="value-input"
            id="value-input"
            name="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição da Despesa
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {
            currencies.map((currency, index) => (
              <option key={ index }>{ currency }</option>
            ))
          }
        </select>
        <select
          name="method-input"
          id="method-input"
          data-testid="method-input"
        >
          {
            methods.map((met, index) => (
              <option key={ index }>{ met }</option>
            ))
          }
        </select>
        <select
          name="tag-input"
          id="tag-input"
          data-testid="tag-input"
        >
          {
            tags.map((tag, index) => (
              <option key={ index }>{ tag }</option>
            ))
          }
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

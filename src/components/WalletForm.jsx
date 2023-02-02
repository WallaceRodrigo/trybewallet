import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, currencyAPI, sumTotalField } from '../redux/actions';
import './styles/walletForm.css';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = {
    id: 0,
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currencyAPI());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  onClick = () => {
    const { dispatch, currentPrice } = this.props;
    const { id, currency, value } = this.state;

    this.setState({ id: id + 1 });

    dispatch(currencyAPI());

    const exchangeFiltered = Object.values(currentPrice).find((a) => a.code === currency);
    dispatch(sumTotalField(value * exchangeFiltered.ask));

    const expense = {
      ...this.state,
      exchangeRates: currentPrice,
    };
    dispatch(addExpense(expense));

    this.setState({
      ...INITIAL_STATE,
    });
  };

  render() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div className="walletFormDiv">
        <label htmlFor="value-input">
          Valor
          <input
            className="textInputs"
            type="number"
            data-testid="value-input"
            id="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição da Despesa
          <input
            type="text"
            className="textInputs"
            data-testid="description-input"
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          id="currency"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {
            currencies.map((curr, index) => (
              <option key={ index }>{ curr }</option>
            ))
          }
        </select>
        <select
          id="method-input"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          {
            methods.map((met, index) => (
              <option key={ index }>{ met }</option>
            ))
          }
        </select>
        <select
          id="tag-input"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          {
            tags.map((t, index) => (
              <option key={ index }>{ t }</option>
            ))
          }
        </select>
        <button onClick={ () => this.onClick() }>Adicionar despesa</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPrice: PropTypes.shape({
    USD: PropTypes.shape({
      code: PropTypes.string.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currentPrice: state.wallet.currentPrice,
});

export default connect(mapStateToProps)(WalletForm);

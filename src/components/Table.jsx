import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  arredondar = (n) => ((Math.round(n * 100) / 100).toFixed(2));

  render() {
    const headers = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    const { expenses } = this.props;
    console.log(expenses);

    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => (<th key={ i }>{ header }</th>))}
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const { exchangeRates } = expense;
              const exchange = Object.values(exchangeRates)
                .find((a) => a.code === expense.currency);
              console.log(exchange);
              return (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ this.arredondar(expense.value) }</td>
                  <td>{ exchange.name }</td>
                  <td>{ this.arredondar(exchange.ask) }</td>
                  <td>{ (this.arredondar(expense.value * exchange.ask)) }</td>
                  <td>Real</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

// https://horadecodar.com.br/2021/07/11/formatar-numero-para-sempre-exibir-duas-casas-decimais-em-javascript/
// função para arredondar números já que o "toFixed()" não estava funcionando

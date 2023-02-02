import React, { Component } from 'react';

class Table extends Component {
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
    return (
      <table>
        <thead>
          {headers.map((header, i) => (<th key={ i }>{ header }</th>))}
        </thead>
        <tbody>
          <tr>
            <td>a</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Table;

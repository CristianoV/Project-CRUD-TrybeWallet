import React from 'react';
import PropTypes from 'prop-types';

export default class Table extends React.Component {
  render() {
    const { currency, description, method, tag, value, exchangeRates } = this.props;
    const valueParse = parseFloat(value);
    const teste = parseFloat(exchangeRates[currency].ask);
    return (
      <tr>
        <td>
          {description}
        </td>
        <td>
          {tag}
        </td>
        <td>
          {method}
        </td>
        <td>
          {valueParse.toFixed(2)}
        </td>
        <td>
          {exchangeRates[currency].name.split('/')[0]}
        </td>
        <td>
          {teste.toFixed(2)}
        </td>
        <td>
          {exchangeRates[currency].ask * value}
        </td>
        <td>
          Real
        </td>
        <td>
          <input type="button" value="Editar" />
          <input type="button" value="Excluir" />
        </td>
      </tr>
    );
  }
}

Table.propTypes = {
  exchangeRates: PropTypes.shape,
  key: PropTypes.string,
}.isRequired;

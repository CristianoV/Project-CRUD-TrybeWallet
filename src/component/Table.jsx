import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpensesAction } from '../actions';

class Table extends React.Component {
handleClickExcluir = (id) => {
  const { valoresDoCurrenci, deleteExpense } = this.props;
  const filterCurrenci = valoresDoCurrenci.filter((currency) => (
    currency.id !== id
  ));
  deleteExpense(filterCurrenci);
}

render() {
  const { id, currency, description, method, tag,
    value, exchangeRates } = this.props;
  const valueParse = parseFloat(value);
  const teste = parseFloat(exchangeRates[currency].ask);
  return (
    <>
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
        <input
          type="button"
          value="Excluir"
          data-testid="delete-btn"
          onClick={ () => this.handleClickExcluir(id) }
        />
      </td>
    </>
  );
}
}

Table.propTypes = {
  exchangeRates: PropTypes.shape,
  key: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  valoresDoCurrenci: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (result) => dispatch(deleteExpensesAction(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '../component/Table';
import { currenciesCoin, expensesAction,
  currenciesCoinExpecific, deleteExpensesAction } from '../actions';

class Wallet extends React.Component {
 state = {
 };

 componentDidMount() {
   const { walletKeyCoin } = this.props;
   walletKeyCoin();
   this.cleanState();
 }

 cleanState = () => {
   this.setState({
     value: '',
     description: '',
     tag: 'Alimentação',
     currency: 'USD',
     method: 'Dinheiro',
   });
 }

calculate = () => {
  const { mapExpenses } = this.props;
  const teste = mapExpenses.map((asd) => (
    asd.value * asd.exchangeRates[asd.currency].ask
  ));
  const conta = teste.reduce((acc, element) => acc + element, 0);
  return teste.length > 0 ? conta : 0;
}

editExpenses = (id) => {
  const { mapExpenses } = this.props;
  const filtro = mapExpenses.filter((edit) => edit.id === id);
  this.setState(...filtro);
  this.setState({ edit: true });
}

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleTeste = () => {
    const { mapExpenses, deleteExpense } = this.props;
    const { id } = this.state;
    const findEdit = mapExpenses.find((edit) => edit.id === id);
    // console.log(findEdit);
    const allExpenses = mapExpenses;
    allExpenses[findEdit.id] = this.state;
    console.log(allExpenses);
    deleteExpense(allExpenses);
    this.setState({ edit: false });
    this.cleanState();
  }

  addExpense = () => {
    const { expenses, allCoins, mapExpenses, CoinExpecific } = this.props;
    const { value, description, tag, currency, method } = this.state;
    const teste = {
      id: mapExpenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: allCoins };
    expenses(teste);
    CoinExpecific();
  };

  render() {
    const { email, currency, mapExpenses } = this.props;
    const { value, description, method, tag, edit, currency: moeda } = this.state;
    this.calculate();
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            {this.calculate().toFixed(2)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select
              name="currency"
              id="currencies"
              value={ moeda }
              onChange={ this.handleChange }
            >
              {currency.map((coin, index) => (
                <option
                  key={ index }
                  value={ coin }
                >
                  {coin}

                </option>))}
            </select>
          </label>
          <label htmlFor="pay">
            Pagamento:
            <select
              name="method"
              id="pay"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              name="tag"
              id="category"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          { edit
            ? (
              <input
                type="button"
                value="Editar despesa"
                data-testid="currency-input"
                onClick={ () => this.handleTeste() }
              />
            )
            : (
              <input
                type="button"
                value="Adicionar despesa"
                onClick={ () => { this.addExpense(); this.cleanState(); } }
              />)}
        </section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {mapExpenses && mapExpenses.map((spent) => (
              <tr key={ spent.id }>
                <Table
                  id={ spent.id }
                  currency={ spent.currency }
                  description={ spent.description }
                  method={ spent.method }
                  tag={ spent.tag }
                  value={ spent.value }
                  exchangeRates={ spent.exchangeRates }
                  edit={ this.editExpenses }
                />
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  walletKeyCoin: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
  mapExpenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  allCoins: PropTypes.arrayOf(PropTypes.shape).isRequired,
  CoinExpecific: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currency: state.wallet.currencies,
  mapExpenses: state.wallet.expenses,
  allCoins: state.wallet.coinPrices,
});

const mapDispatchToProps = (dispatch) => ({
  walletKeyCoin: () => dispatch(currenciesCoin()),
  expenses: (state) => dispatch(expensesAction(state)),
  CoinExpecific: () => dispatch(currenciesCoinExpecific()),
  deleteExpense: (result) => dispatch(deleteExpensesAction(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '../component/Table';
import { currenciesCoin, expensesAction, currenciesCoinExpecific } from '../actions';

class Wallet extends React.Component {
 state = {
   ask: 0,
   value: '',
   description: '',
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

  changeValueHeader = (valor, valor2) => {
    const valorMoeda = valor.ask * valor2;
    this.setState((prevState) => (
      { ask: prevState.ask + valorMoeda }
    ));
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

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
    const valor = allCoins[currency];
    this.changeValueHeader(valor, value);
    CoinExpecific();
  };

  render() {
    const { email, currency, mapExpenses } = this.props;
    const { value, description, ask } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            {ask.toFixed(2)}
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
            <select name="currency" id="currencies" onChange={ this.handleChange }>
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
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <input
            type="button"
            value="Adicionar despesa"
            onClick={ () => {
              this.addExpense();
              this.cleanState();
            } }
          />
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
            {mapExpenses && mapExpenses.map((spent, index) => (
              <Table
                key={ index }
                currency={ spent.currency }
                description={ spent.description }
                method={ spent.method }
                tag={ spent.tag }
                value={ spent.value }
                exchangeRates={ spent.exchangeRates }
              />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

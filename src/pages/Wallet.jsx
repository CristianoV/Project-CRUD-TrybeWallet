import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
     category: 'Alimentação',
     currencies: 'USD',
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
    this.setState({ [name]: value }, this.verifica);
  };

  addExpense = () => {
    const { expenses, allCoins, mapExpenses, CoinExpecific } = this.props;
    const { value, description, category, currencies, method } = this.state;
    const teste = {
      id: mapExpenses.length,
      value,
      description,
      currency: currencies,
      method,
      tag: category,
      exchangeRates: allCoins };
    expenses(teste);
    const valor = allCoins[currencies];
    this.changeValueHeader(valor, value);
    CoinExpecific();
  };

  render() {
    const { email, currencies } = this.props;
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
            <select name="currencies" id="currencies" onChange={ this.handleChange }>
              {currencies.map((coin, index) => (
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
              name="category"
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
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  walletKeyCoin: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  mapExpenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  allCoins: PropTypes.arrayOf(PropTypes.shape).isRequired,
  CoinExpecific: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  mapExpenses: state.wallet.expenses,
  allCoins: state.wallet.coinPrices,
});

const mapDispatchToProps = (dispatch) => ({
  walletKeyCoin: () => dispatch(currenciesCoin()),
  expenses: (state) => dispatch(expensesAction(state)),
  CoinExpecific: () => dispatch(currenciesCoinExpecific()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

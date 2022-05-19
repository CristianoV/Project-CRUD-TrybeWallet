import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesCoin } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { wallet } = this.props;
    wallet();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            0
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section>
          <label htmlFor="despesa">
            Valor:
            <input type="number" name="despesa" id="despesa" data-testid="value-input" />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select name="currencies" id="currencies">
              {currencies.map((coin, index) => (
                <option key={ index } value={ coin }>{coin}</option>))}
            </select>
          </label>
          <label htmlFor="pay">
            Pagamento:
            <select name="" id="pay" data-testid="method-input">
              <option value="">Dinheiro</option>
              <option value="">Cartão de crédito</option>
              <option value="">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select name="" id="category" data-testid="tag-input">
              <option value="">Alimentação</option>
              <option value="">Lazer</option>
              <option value="">Trabalho</option>
              <option value="">Transporte</option>
              <option value="">Saúde</option>
            </select>
          </label>
        </section>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  wallet: PropTypes.func.isRequired,
  currencies: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  wallet: () => dispatch(currenciesCoin()) });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

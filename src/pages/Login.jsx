import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.verifica);
  };

  verifica = () => {
    const { email, password } = this.state;
    // console.log(email, password);
    const regex = /\S+@\S+\.\S+/;
    const MIN_CARACTERS = 6;
    const validEmail = regex.test(email);
    return validEmail && password.length >= MIN_CARACTERS
      ? this.setState({ buttonDisabled: false })
      : this.setState({ buttonDisabled: true });
  }

  handleClick = () => {
    const { history, user } = this.props;
    user(this.state);
    history.push('/carteira');
  }

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <nav className="grid text-center">
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email:
            <input
              type="email"
              className="form-control"
              required
              name="email"
              id="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="senha">
            Senha:
            <input
              type="password"
              className="form-control"
              required
              name="password"
              id="senha"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Entrar"
          disabled={ buttonDisabled }
          onClick={ () => this.handleClick() }
        />
      </nav>
    );
  }
}

Login.propTypes = {
  user: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  user: (state) => dispatch(userAction(state)) });

export default connect(null, mapDispatchToProps)(Login);

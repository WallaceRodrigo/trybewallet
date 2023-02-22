import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    password: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  };

  onClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;

    dispatch(saveEmail(email));

    history.push('/carteira');
  };

  render() {
    const { password, email } = this.state;
    const six = 6;
    const regex = /\S+@\S+\.\S+/;
    const buttonValidation = password.length >= six && regex.test(email);

    return (
      <div className="LoginFormContainer">
        <div className="loginForm">
          <h1>Login</h1>
          <label htmlFor="email">
            <h3>Email</h3>
            <input
              type="email"
              name="email"
              id="email"
              className="textInputs"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <h3>Password</h3>
            <input
              type="password"
              name="password"
              id="password"
              className="textInputs"
              data-testid="password-input"
              minLength={ 6 }
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ !buttonValidation }
            onClick={ () => this.onClick() }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Login);

import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Login', () => {
  it('Testa se existem os inputs para email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Testa se o botão fica inativo ao digitar um email e senha invalidos', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'testetesteste');
    userEvent.type(passwordInput, '123');

    expect(button).toBeDisabled();
  });

  it('Testa se o botão fica ativo ao digitar um email e senha validos', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234567');

    expect(button).toBeEnabled();
  });

  it('Testa se o email é salvo no estado global e redireciona para o path "/carteira"', () => {
    const { store, history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    expect(store.getState().user.email).toBe('teste@teste.com');

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Testa o componente Login', () => {
  it('Testa se o email é recuperado do estado global e exibido na tela', () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
    };

    renderWithRouterAndRedux(<Header />, { initialState });

    const email = screen.getByRole('heading', { name: /email: teste@teste\.com/i });

    expect(email).toBeInTheDocument();
  });
  it('Testa se os inputs e botoes existem', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const valueInput = screen.getByText(/valor/i);
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Testa se é possivel salvar uma nova dispesa no estado corretamente', () => {
    const INITIAL_STATE = {
      currentPrice: {
        USD: {
          code: 'USD',
          ask: '5.0557',
        },
      },
    };

    const { store } = renderWithRouterAndRedux(<WalletForm />, { INITIAL_STATE });

    const valueInput = screen.getByText(/valor/i);
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Ten Dollar');
    userEvent.click(button);

    const expectStore = {
      currency: 'USD',
      description: 'Ten Dollar',
      exchangeRates: {
        USD: {
          code: 'USD',
          ask: '5.0557',
        },
      },
      id: 0,
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '10',
    };
    expect(store.getState().wallet.expenses[0]).toMatchObject(expectStore);
  });

  it('Testa o fetch', () => {
    global.fetch = jest.fn(() => (Promise.resolve({
      json: () => Promise.resolve(mockData),
    })));

    const { store } = renderWithRouterAndRedux(<Wallet />);

    expect(store).toBe('');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
});

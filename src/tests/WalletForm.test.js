import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

afterEach(() => jest.clearAllMocks());

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

  // it('Testa o fetch', () => {
  //   global.fetch = jest.fn(() => (Promise.resolve({
  //     json: () => Promise.resolve(mockData),
  //   })));

  //   renderWithRouterAndRedux(<Wallet />);

  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  // });

  it('Testa um erro no fetch', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    const { store } = renderWithRouterAndRedux(<Wallet />);

    await expect(store.getState().wallet).toBe('');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  it('Testa a função de editar uma despesa entre duas e se a ordem está correta', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const methodInput = screen.getByRole('combobox', { name: /forma de pagamento/i });
    const tagInput = screen.getByRole('combobox', { name: /categoria da despesa/i });

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    const dollars100 = '100 Dollars';
    const dollars300 = '300 Dollars';

    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, '20 dollars');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(addButton);

    userEvent.type(valueInput, '100');
    userEvent.type(descriptionInput, dollars100);
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.click(addButton);

    userEvent.type(valueInput, '300');
    userEvent.type(descriptionInput, dollars300);
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.click(addButton);

    const description = screen.getByText('20 dollars');
    const description2 = screen.getByText(dollars100);
    const description3 = screen.getByText(dollars300);
    expect(description).toBeInTheDocument();
    expect(description2).toBeInTheDocument();
    expect(description3).toBeInTheDocument();

    const editButton = screen.getAllByTestId('edit-btn');
    expect(editButton).toHaveLength(3);

    userEvent.click(editButton[0]);

    userEvent.type(valueInput, '500');
    userEvent.type(descriptionInput, '500 Dollars');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Trabalho');

    const saveEditButton = screen.getByText('Editar despesa');
    expect(saveEditButton).toBeInTheDocument();

    userEvent.click(saveEditButton);

    expect(screen.getByText('100 Dollars')).toBeInTheDocument();
    expect(screen.getByText('300 Dollars')).toBeInTheDocument();
    expect(screen.getByText('500 Dollars')).toBeInTheDocument();
  });

  it('Testa a função de editar uma despesa', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const methodInput = screen.getByRole('combobox', { name: /forma de pagamento/i });
    const tagInput = screen.getByRole('combobox', { name: /categoria da despesa/i });

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Ten Dollars');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addButton);

    const description = screen.getByText('Ten Dollars');
    const value = screen.getByText('10.00');
    const method = screen.getAllByText('Dinheiro');
    const tag = screen.getAllByText('Lazer');

    expect(description).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(method[1]).toBeInTheDocument();
    expect(tag[1]).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Real/i })).toBeInTheDocument();

    const editButton = screen.getByTestId('edit-btn');

    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);

    const saveEditButton = screen.getByText('Editar despesa');
    expect(saveEditButton).toBeInTheDocument();

    userEvent.type(valueInput, '200');
    userEvent.type(descriptionInput, '200 Dollars');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Trabalho');

    userEvent.click(saveEditButton);

    expect(screen.getByText('200 Dollars')).toBeInTheDocument();
    expect(screen.getByText('200.00')).toBeInTheDocument();
    expect(screen.getAllByText('Cartão de débito')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Trabalho')[1]).toBeInTheDocument();
  });
});

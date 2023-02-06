import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

afterEach(() => jest.clearAllMocks());

describe('Testa o componente Table', () => {
  it('Testa se a despesa é adicionada corretamente', async () => {
    global.fetch = jest.fn(() => (Promise.resolve({
      json: () => Promise.resolve(mockData),
    })));

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const methodInput = screen.getByRole('combobox', { name: /forma de pagamento/i });
    const tagInput = screen.getByRole('combobox', { name: /categoria da despesa/i });

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, '10 Dollars');

    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');

    expect(valueInput).toHaveValue(10);
    expect(descriptionInput).toHaveValue('10 Dollars');
    expect(methodInput).toHaveValue('Dinheiro');
    expect(tagInput).toHaveValue('Lazer');

    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addButton);

    expect(screen.getByRole('cell', { name: /10 Dollars/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /lazer/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dinheiro/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /10.00/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Real/i })).toBeInTheDocument();
  });

  it('Testa função de excluir uma despesa', async () => {
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

    const deleteButton = screen.getByTestId('delete-btn');
    const editButton = screen.getByTestId('edit-btn');

    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);
    userEvent.click(deleteButton);

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(description).not.toBeInTheDocument();
    expect(value).not.toBeInTheDocument();
    expect(method[1]).not.toBeInTheDocument();
    expect(tag[1]).not.toBeInTheDocument();
  });
});

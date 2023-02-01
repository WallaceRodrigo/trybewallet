import { API_ERROR, API_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.data).filter((c) => c !== 'USDT'),
    };
  case API_ERROR:
    return {
      ...state,
      currencies: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
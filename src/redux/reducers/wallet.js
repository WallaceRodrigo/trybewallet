import {
  ADD_EXPENSE,
  API_ERROR,
  API_SUCCESS,
  SUM_TOTALFIELD,
  REMOVE_EXPENSE,
  MINUS_TOTALFIELD,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  currentPrice: {
    USD: {
      code: 'USD',
      ask: '5.0557',
    },
  },
  totalValue: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.data).filter((c) => c !== 'USDT'),
      currentPrice: action.data,
    };
  case API_ERROR:
    return {
      ...state,
      currencies: action.error,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.concat(action.expenses),
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case SUM_TOTALFIELD:
    return {
      ...state,
      totalValue: state.totalValue + action.value,
    };
  case MINUS_TOTALFIELD:
    return {
      ...state,
      totalValue: state.totalValue - action.value,
    };
  default:
    return state;
  }
};

export default wallet;

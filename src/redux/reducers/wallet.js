import {
  ADD_EXPENSE,
  API_SUCCESS,
  SUM_TOTALFIELD,
  REMOVE_EXPENSE,
  MINUS_TOTALFIELD,
  EDIT_EXPENSE,
  SAVE_EDIT_EXPENSE,
  SAVE_TOTALFIELD,
  DISPLAYEDITS,
} from '../actions';

const initialFunc = () => {};

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
  editedExpense: {},
  func: initialFunc(),
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.data).filter((c) => c !== 'USDT'),
      currentPrice: action.data,
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
  case SAVE_TOTALFIELD:
    return {
      ...state,
      totalValue: action.value,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editedExpense: action.expense,
    };
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  case DISPLAYEDITS:
    return {
      ...state,
      func: action.func,
    };
  default:
    return state;
  }
};

export default wallet;

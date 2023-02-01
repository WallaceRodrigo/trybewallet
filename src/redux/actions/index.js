export const SAVE_EMAIL = 'SAVE_EMAIL';
export const CURRENCY_API = 'CURRENCY_API';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SUM_TOTALFIELD = 'SUM_TOTALFIELD';

export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });

export const apiSuccess = (data) => ({ type: API_SUCCESS, data });

export const apiError = (error) => ({ type: API_ERROR, error });

export const currencyAPI = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(apiSuccess(data));
  } catch (error) {
    dispatch(apiSuccess(error));
    console.log(error);
  }
};

export const addExpense = (expenses) => ({ type: ADD_EXPENSE, expenses });

export const sumTotalField = (value) => ({ type: SUM_TOTALFIELD, value });

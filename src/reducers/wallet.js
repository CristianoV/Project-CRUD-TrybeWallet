// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  coinPrices: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'WALLET_ACTION':
    return { ...action.state };
  case 'CURRENCY_ACTION':
    return { ...state,
      currencies: action.result };
  case 'EXPENSES_ACTION':
    return { ...state, expenses: [...state.expenses, action.result] };
  case 'CURRENCY_EXPECIFIC_ACTION':
    return { ...state, coinPrices: action.result };
  case 'DELETE_CURRENCY':
    return { ...state,
      expenses: [...action.result] };
  default:
    return state;
  }
}

export default wallet;

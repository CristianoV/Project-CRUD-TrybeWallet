// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'WALLET_ACTION':
    return { ...action.state };
  case 'CURRENCY_ACTION':
    return { ...state, currencies: action.result };
  default:
    return state;
  }
}

export default wallet;

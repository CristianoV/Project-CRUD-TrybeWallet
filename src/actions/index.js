export const userAction = (state) => ({ type: 'USER_ACTION', state });
export const walletAction = (state) => ({ type: 'WALLET_ACTION', state });
export const expensesAction = (result) => ({ type: 'EXPENSES_ACTION', result });
export const currenciesAction = (result) => ({ type: 'CURRENCY_ACTION', result });
export const currenciesActionExpecific = (result) => (
  { type: 'CURRENCY_EXPECIFIC_ACTION', result });

export function currenciesCoin() {
  return async (dispatch) => {
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resultCurrenci = await data.json();
    // const currenciKeys = Object.keys(resultCurrenci);
    // const notUSDT = currenciKeys.filter((coin) => coin !== 'USDT');
    dispatch(currenciesActionExpecific(resultCurrenci));
    const notUSDT = Object.keys(resultCurrenci)
      .filter((coin) => coin !== 'USDT');
    dispatch(currenciesAction(notUSDT));
  };
}

export function currenciesCoinExpecific() {
  return async (dispatch) => {
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resultCurrenci = await data.json();
    dispatch(currenciesActionExpecific(resultCurrenci));
  };
}

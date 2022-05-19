export const userAction = (state) => ({ type: 'USER_ACTION', state });
export const walletAction = (state) => ({ type: 'WALLET_ACTION', state });
export const currenciesAction = (result) => ({ type: 'CURRENCY_ACTION', result });

export function currencies() {
  return async (dispatch) => {
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resultCurrenci = await data.json();
    const currenciKeys = Object.keys(resultCurrenci);
    const notUSDT = currenciKeys.filter((coin) => coin !== 'USDT');
    dispatch(currenciesAction(notUSDT));
  };
}

import currency from 'currency.js';

import config from './config';

export const formatCurrency = value =>
  currency(parseFloat(value), {
    symbol: `${config.currency} `,
    formatWithSymbol: true,
  }).format();

export const log = value => console.log(value); // eslint-disable-line

export const makeId = length => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

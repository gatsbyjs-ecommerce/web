import React from 'react';
import { useStoreState } from 'easy-peasy';
import currency from 'currency.js';
import { find } from 'lodash';

export const getPrice = (pricing, isDiscount, location) => {
  let value = 0;
  let price;
  if (location) {
    price = find(pricing, { country: location.country });
  }
  if (!price) {
    // if no country, use USD as default
    price = find(pricing, { country: 'United States of America' });
  }
  if (price) {
    value = isDiscount ? price.discountPrice : price.price;
  }
  return value;
};

const CurrencyFormat = ({ pricing, amount, isDiscount }) => {
  let value = 0;
  const location = useStoreState(state => state.user.location);

  if (pricing) {
    value = getPrice(pricing, isDiscount, location);
  }
  if (amount) {
    value = amount;
  }

  const formatCurrency = (val, currencySymbol) => {
    return currency(parseFloat(val), {
      symbol: `${currencySymbol || '$'} `,
      formatWithSymbol: true,
    }).format();
  };

  return <>{formatCurrency(value, location.currency)}</>;
};

export default CurrencyFormat;

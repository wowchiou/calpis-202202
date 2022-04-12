export default {
  getExchangeList(exchangePrizes) {
    return exchangePrizes.map(({ awards_id, quantity }) => {
      return {
        awards_id,
        exchange_nu: quantity,
      };
    });
  },
};

export default {
  formatePrizesData(prizes) {
    return prizes.map((itm) => ({
      ...itm,
      quantity: '',
    }));
  },
};

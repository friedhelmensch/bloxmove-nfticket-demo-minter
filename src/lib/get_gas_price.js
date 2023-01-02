const get_gas_price = async (provider) => {
  return Math.round((await provider.getGasPrice()) * 1.2);
};

module.exports = get_gas_price;

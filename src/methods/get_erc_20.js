const get_erc_20 = async (token_id, ticket_demo_contract, gas_price) => {
  const get_erc_20_tx = await ticket_demo_contract.getErc20(token_id, {
    gasLimit: 250000,
    gasPrice: gas_price,
  });

  const get_erc_20_tx_receipt = await get_erc_20_tx.wait();
  console.log("received ERC 20");

  return get_erc_20_tx_receipt;
};

module.exports = get_erc_20;

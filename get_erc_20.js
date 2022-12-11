const get_erc_20 = async (
  token_id,
  signer_address,
  provider,
  ticket_demo_contract
) => {
  const gasPrice = Math.round((await provider.getGasPrice()) * 1.15);
  const nonce = await provider.getTransactionCount(signer_address);

  const get_erc_20_tx = await ticket_demo_contract.getErc20(token_id, {
    gasLimit: 250000,
    gasPrice: gasPrice,
    nonce: nonce,
  });

  const get_erc_20_tx_receipt = await get_erc_20_tx.wait();
  console.log("received ERC 20");

  return get_erc_20_tx_receipt;
};

module.exports = get_erc_20;

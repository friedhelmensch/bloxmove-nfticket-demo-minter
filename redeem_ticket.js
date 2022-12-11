const redeem_ticket = async (
  token_id,
  signer_address,
  provider,
  ticket_demo_contract
) => {
  const gasPrice = Math.round((await provider.getGasPrice()) * 1.15);
  const nonce = await provider.getTransactionCount(signer_address);

  const redeem_tx = await ticket_demo_contract.redeemNfticket(token_id, {
    gasLimit: 1000000,
    gasPrice: gasPrice,
    nonce: nonce,
  });

  const redeem_receipt = await redeem_tx.wait();
  console.log("redeemed");
};

module.exports = redeem_ticket;

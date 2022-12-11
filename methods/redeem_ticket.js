const redeem_ticket = async (token_id, provider, ticket_demo_contract) => {
  const gasPrice = Math.round((await provider.getGasPrice()) * 1.15);

  const redeem_tx = await ticket_demo_contract.redeemNfticket(token_id, {
    gasLimit: 1000000,
    gasPrice: gasPrice,
  });

  const redeem_receipt = await redeem_tx.wait();
  console.log("redeemed");
};

module.exports = redeem_ticket;

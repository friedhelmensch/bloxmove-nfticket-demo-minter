const redeem_ticket = async (token_id, ticket_demo_contract, gas_price) => {
  const redeem_tx = await ticket_demo_contract.redeemNfticket(token_id, {
    gasLimit: 250000,
    gasPrice: gas_price,
  });

  const redeem_receipt = await redeem_tx.wait();
  console.log("redeemed");
};

module.exports = redeem_ticket;

const get_gas_price = require("../lib/get_gas_price");

const redeem_ticket = async (token_id, provider, ticket_demo_contract) => {
  const gasPrice = await get_gas_price(provider);

  const redeem_tx = await ticket_demo_contract.redeemNfticket(token_id, {
    gasLimit: 200000,
    gasPrice: gasPrice,
  });

  const redeem_receipt = await redeem_tx.wait();
  console.log("redeemed");
};

module.exports = redeem_ticket;

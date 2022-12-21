const get_gas_price = require("../lib/get_gas_price");
const ethers = require("ethers");

const add_balance_to_ticket = async (
  token_id,
  provider,
  ticket_demo_contract
) => {
  const gasPrice = await get_gas_price(provider);
  // const gas = await ticket_demo_contract.estimateGas.addBalanceToTicket(
  //   token_id
  // );
  // const costs = ethers.BigNumber.from(gasPrice).mul(ethers.BigNumber.from(gas));
  // console.log(gas.toNumber());
  // console.log(ethers.utils.formatEther(costs));

  const add_balance_to_ticket_tx =
    await ticket_demo_contract.addBalanceToTicket(token_id, {
      gasLimit: 3000000,
      gasPrice: gasPrice,
    });

  const add_balance_to_ticket_receipt = await add_balance_to_ticket_tx.wait();
  console.log("balance added to ticket");

  return add_balance_to_ticket_receipt;
};

module.exports = add_balance_to_ticket;

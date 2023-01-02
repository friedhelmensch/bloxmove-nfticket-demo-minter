const add_balance_to_ticket = async (
  token_id,
  ticket_demo_contract,
  gas_price
) => {
  const add_balance_to_ticket_tx =
    await ticket_demo_contract.addBalanceToTicket(token_id, {
      gasLimit: 5000000,
      gasPrice: gas_price,
    });

  const add_balance_to_ticket_receipt = await add_balance_to_ticket_tx.wait();
  console.log("balance added to ticket");

  return add_balance_to_ticket_receipt;
};

module.exports = add_balance_to_ticket;

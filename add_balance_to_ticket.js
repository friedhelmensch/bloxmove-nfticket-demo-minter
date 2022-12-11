const add_balance_to_ticket = async (
  token_id,
  signer_address,
  provider,
  ticket_demo_contract
) => {
  const gasPrice = Math.round((await provider.getGasPrice()) * 1.15);
  const nonce = await provider.getTransactionCount(signer_address);

  const add_balance_to_ticket_tx =
    await ticket_demo_contract.addBalanceToTicket(token_id, {
      gasLimit: 1750000,
      gasPrice: gasPrice,
      nonce: nonce,
    });

  const add_balance_to_ticket_receipt = await add_balance_to_ticket_tx.wait();
  console.log("balance added to ticket");

  return add_balance_to_ticket_receipt;
};

module.exports = add_balance_to_ticket;

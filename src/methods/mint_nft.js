const get_gas_price = require("../lib/get_gas_price");

const mint_nft = async (provider, ticket_demo_contract) => {
  const gasPrice = await get_gas_price(provider);
  const mint_tx = await ticket_demo_contract.mintNfticket(
    "ipfs://QmXABjGNK3PbffbjZYr4iJ5FLxRooc6b6hbPXoNdkfXPRx",
    {
      gasLimit: 1000000,
      gasPrice: gasPrice,
    }
  );

  const mint_tx_receipt = await mint_tx.wait();

  const id_as_hex = mint_tx_receipt.logs[4].topics[1];
  const token_id = parseInt(id_as_hex);
  console.log(`minted id: ${token_id}`);
  return token_id;
};

module.exports = mint_nft;

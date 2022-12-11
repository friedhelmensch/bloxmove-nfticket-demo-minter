require("dotenv").config();
const generate = require("./generateWallet");
const send = require("./send_matic");
const get_erc_20 = require("./get_erc_20");
const add_balance_to_ticket = require("./add_balance_to_ticket");
const redeem_ticket = require("./redeem_ticket");
const get_contract = require("./get_contract");

const ethers = require("ethers");

const doIt = async () => {
  for (let i = 0; i < 1; i++) {
    console.log(`----- ${i} -------`);
    const { privateKey, address } = generate();
    await send(process.env.SPENDER_PRIVATEKEY, address, "0.2");
    await mint_nft_get_37_tokens(privateKey);
  }
};

const mint_nft_get_37_tokens = async (private_key) => {
  let provider = new ethers.providers.InfuraProvider(
    "matic",
    process.env.INFURA_PROJECTID
  );

  const signer = new ethers.Wallet(private_key, provider);
  console.log(`mint nft and get 37 tokens for ${signer.address}`);

  const NFTicketDemoServiceContract = get_contract(signer);

  const gasPrice = Math.round((await provider.getGasPrice()) * 1.15);
  const nonce = await provider.getTransactionCount(signer.address);

  const mint_tx = await NFTicketDemoServiceContract.mintNfticket(
    "ipfs://QmXABjGNK3PbffbjZYr4iJ5FLxRooc6b6hbPXoNdkfXPRx",
    {
      gasLimit: 1000000,
      gasPrice: gasPrice,
      nonce: nonce,
    }
  );

  const mint_tx_receipt = await mint_tx.wait();
  console.log("minted");
  const id_as_hex = mint_tx_receipt.logs[4].topics[1];
  const token_id = parseInt(id_as_hex);

  await redeem_ticket(
    token_id,
    signer.address,
    provider,
    NFTicketDemoServiceContract
  );

  await add_balance_to_ticket(
    token_id,
    signer.address,
    provider,
    NFTicketDemoServiceContract
  );

  await get_erc_20(
    token_id,
    signer.address,
    provider,
    NFTicketDemoServiceContract
  );
};

doIt();

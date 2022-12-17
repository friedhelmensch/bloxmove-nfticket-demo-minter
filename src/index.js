const ethers = require("ethers");
require("dotenv").config();

//lib
const generate_wallet = require("./lib/generate_wallet");
const send = require("./lib/send_matic");
const save_wallet = require("./lib/save_wallet");

//methods
const mint_nft = require("./methods/mint_nft");
const redeem_ticket = require("./methods/redeem_ticket");
const get_erc_20 = require("./methods/get_erc_20");
const add_balance_to_ticket = require("./methods/add_balance_to_ticket");
//utils
const provider = require("./utils/provider");
const get_contract = require("./utils/get_contract");

const doIt = async () => {
  for (let i = 0; i < 1; i++) {
    console.log(`----- ${i} -------`);

    const wallet = generate_wallet();
    save_wallet(process.env.WALLETS_PATH, wallet);

    await send(process.env.SPENDER_PRIVATEKEY, wallet.address, "0.25");
    await mint_nft_get_37_tokens(wallet.privateKey);
  }
};

const mint_nft_get_37_tokens = async (private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  console.log(`mint nft and get 37 tokens for ${signer.address}`);

  const NFTicketDemoServiceContract = get_contract(signer);

  const token_id = await mint_nft(provider, NFTicketDemoServiceContract);

  await redeem_ticket(token_id, provider, NFTicketDemoServiceContract);

  await add_balance_to_ticket(token_id, provider, NFTicketDemoServiceContract);

  await get_erc_20(token_id, provider, NFTicketDemoServiceContract);
};

doIt();
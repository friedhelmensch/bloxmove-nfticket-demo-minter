const ethers = require("ethers");
require("dotenv").config();

//lib
const generate_wallet = require("./lib/generate_wallet");
const send = require("./lib/send");
const save_wallet = require("./lib/save_wallet");

//methods
const mint_nft = require("./methods/mint_nft");
const redeem_ticket = require("./methods/redeem_ticket");
const get_erc_20 = require("./methods/get_erc_20");
const add_balance_to_ticket = require("./methods/add_balance_to_ticket");
//utils
const provider = require("./utils/provider");
const get_contract = require("./utils/get_contract");
const get_gas_price = require("./lib/get_gas_price");

const doIt = async () => {
  const signer = new ethers.Wallet(process.env.SPENDER_PRIVATEKEY, provider);

  for (let i = 0; i < 10; i++) {
    console.log(`----- ${i} -------`);

    const wallet = generate_wallet();
    save_wallet(process.env.WALLETS_PATH, wallet);

    await send(signer, get_gas_price, wallet.address, "0.41");
    console.log(`sent 0.41 matic to ${wallet.address}`);

    console.log(`mint nft and get 37 tokens for ${wallet.address}`);
    await mint_nft_get_37_tokens(
      new ethers.Wallet(wallet.privateKey, provider)
    );
  }
};

const mint_nft_get_37_tokens = async (signer) => {
  const NFTicketDemoServiceContract = get_contract(signer);

  const token_id = await mint_nft(provider, NFTicketDemoServiceContract);

  await redeem_ticket(token_id, provider, NFTicketDemoServiceContract);

  await add_balance_to_ticket(token_id, provider, NFTicketDemoServiceContract);

  await get_erc_20(token_id, provider, NFTicketDemoServiceContract);
};

doIt();

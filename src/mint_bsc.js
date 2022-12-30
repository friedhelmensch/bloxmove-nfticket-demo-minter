const ethers = require("ethers");
require("dotenv").config();

//lib
const load_all_wallets = require("./lib/load_all_wallets");
const move_wallet = require("./lib/move_wallet");
const chunk_array = require("./lib/chunk_array");

//methods
const mint_nft = require("./methods/mint_nft");
const redeem_ticket = require("./methods/redeem_ticket");
const get_erc_20 = require("./methods/get_erc_20");
const add_balance_to_ticket = require("./methods/add_balance_to_ticket");
//utils
const provider = require("./utils/bsc_provider");
const get_contract = require("./utils/get_contract");

const doIt = async () => {
  const wallets = await load_all_wallets(process.env.WALLETS_PATH);
  const chunked_wallets = chunk_array(wallets, 1);

  chunked_wallets.forEach(async (chunk) => {
    const promises = chunk.map((wallet) => {
      const signer = new ethers.Wallet(wallet.privateKey, provider);
      return mint_nft_get_37_tokens(signer);
    });
    const chunk_number = chunked_wallets.indexOf(chunk);
    await Promise.all(promises);
    console.log(`chunk: ${chunk_number} finished`);

    return promises;
  });
};

// const bla = async (signer) => {
//   await timeout(1000);
//   console.log(`wallet: ${signer.address}`);
// };

// function timeout(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const mint_nft_get_37_tokens = async (signer) => {
  const NFTicketDemoServiceContract = get_contract(signer);
  try {
    const token_id = await mint_nft(NFTicketDemoServiceContract);
    await redeem_ticket(token_id, NFTicketDemoServiceContract);
    await add_balance_to_ticket(token_id, NFTicketDemoServiceContract);
    await get_erc_20(token_id, NFTicketDemoServiceContract);

    const source_path = `${process.env.WALLETS_PATH}/${signer.address}.txt`;
    const target_path = `${process.env.WITH_TOKENS_WALLETS_PATH}/${signer.address}.txt`;
    move_wallet(source_path, target_path);
  } catch (e) {
    console.log(`failed for ${signer.address}: ${e}`);
  }
};

doIt();

const ethers = require("ethers");
require("dotenv").config();

//lib
const load_all_wallets = require("./lib/load_all_wallets");
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
  const chunked_wallets = chunk_array(wallets, 2);

  chunked_wallets.forEach(async (chunk) => {
    console.log(`--------------------------------------`);
    console.log(`chunk no ${chunked_wallets.indexOf(chunk)}`);

    const promises = chunk.map((wallet) => {
      const signer = new ethers.Wallet(wallet.privateKey, provider);
      return blaBlubb(signer);
    });
    Promise.all(promises);
  });
};

const blaBlubb = async (signer) => {
  console.log(`mint nft and get 37 tokens for ${signer.address}`);
  await timeout(500);
  if (signer.address.includes("0xEB")) {
    return false;
  }
  return true;
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mint_nft_get_37_tokens = async (signer) => {
  const NFTicketDemoServiceContract = get_contract(signer);
  try {
    const token_id = await mint_nft(NFTicketDemoServiceContract);
    await redeem_ticket(token_id, NFTicketDemoServiceContract);
    await add_balance_to_ticket(token_id, NFTicketDemoServiceContract);
    await get_erc_20(token_id, NFTicketDemoServiceContract);
    return true;
  } catch {
    console.log(`failed for ${signer.address}`);
    return false;
  }
};

doIt();

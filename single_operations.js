require("dotenv").config();
const ethers = require("ethers");

//methods
const mint_nft = require("./methods/mint_nft");
const redeem_ticket = require("./methods/redeem_ticket");
const add_balance_to_ticket = require("./methods/add_balance_to_ticket");
const get_erc_20 = require("./methods/get_erc_20");

//utils
const get_contract = require("./utils/get_contract");
const provider = require("./utils/provider");

const get_erc = async (token_id, private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  await get_erc_20(token_id, provider, contract);
};

const redeem = async (token_id, private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  await redeem_ticket(token_id, provider, contract);
};

const add_balance = async (token_id, private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  await add_balance_to_ticket(token_id, provider, contract);
};

const mint = async (private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  await mint_nft(provider, contract);
};

redeem(1570, process.env.CURRENT_PRIVATEKEY);

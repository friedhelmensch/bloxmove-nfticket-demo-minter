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
const send = require("./lib/send");

//lib
const generate_wallet = require("./lib/generate_wallet");

const generate = () => {
  console.log(generate_wallet());
};

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

const send_some = async (private_key, to, amount) => {
  await send(private_key, to, amount);
};

generate();
//get_erc(123, process.env.CURRENT_PRIVATEKEY);

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
const get_gas_price = require("./lib/get_gas_price");
const save_wallet = require("./lib/save_wallet");

const generate = () => {
  const wallet = generate_wallet();
  console.log(wallet);
  //save_wallet(process.env.WALLETS_PATH, wallet);
};

const get_erc = async (token_id, private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  const gas_price = await get_gas_price(provider);
  await get_erc_20(token_id, contract, gas_price);
};

const redeem = async (token_id, private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  const gas_price = await get_gas_price(provider);
  await redeem_ticket(token_id, contract, gas_price);
};

const add_balance = async (token_id, private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  const gas_price = await get_gas_price(provider);
  await add_balance_to_ticket(token_id, contract, gas_price);
};

const mint = async (private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  const gas_price = await get_gas_price(provider);
  await mint_nft(contract, gas_price);
};

const send_some = async (private_key, to, amount) => {
  const signer = new ethers.Wallet(private_key, provider);
  await send(signer, get_gas_price, to, amount);
};

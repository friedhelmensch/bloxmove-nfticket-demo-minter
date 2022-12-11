const ethers = require("ethers");
const get_contract = require("./get_contract");
const get_erc_20 = require("./get_erc_20");
const redeem_ticket = require("./redeem_ticket");
const add_balance_to_ticket = require("./add_balance_to_ticket");
const provider = require("./provider");

const get_erc = async (token_id, private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  await get_erc_20(token_id, signer.address, provider, contract);
};

const redeem = async (token_id, private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  await redeem_ticket(token_id, signer.address, provider, contract);
};

const add_balance = async (token_id, private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  const contract = get_contract(signer);
  await add_balance_to_ticket(token_id, signer.address, provider, contract);
};

get_erc(123, "_");

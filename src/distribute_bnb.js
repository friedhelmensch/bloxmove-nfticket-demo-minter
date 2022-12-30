const ethers = require("ethers");
require("dotenv").config();

//lib
const generate_wallet = require("./lib/generate_wallet");
const send = require("./lib/send");
const save_wallet = require("./lib/save_wallet");

//methods
//utils
const provider = require("./utils/bsc_provider");
const get_gas_price = require("./lib/get_gas_price");

const distribute = async () => {
  const signer = new ethers.Wallet(process.env.SPENDER_PRIVATEKEY, provider);

  for (let i = 0; i < 3; i++) {
    console.log(`----- ${i} -------`);

    const wallet = generate_wallet();
    save_wallet(process.env.WALLETS_PATH, wallet);

    await send(signer, get_gas_price, wallet.address, "0.0065");
    console.log(`sent 0.0065 BNB to ${wallet.address}`);
  }
};

distribute();

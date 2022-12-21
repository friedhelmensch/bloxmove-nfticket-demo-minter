require("dotenv").config();
const ethers = require("ethers");
const get_blxft_contract = require("./utils/get_blxft_contract");
const load_all_wallets = require("./lib/load_all_wallets");
const provider = require("./utils/provider");

const check_all = async () => {
  const blxft_contract = get_blxft_contract(provider);
  const wallets = await load_all_wallets(process.env.WALLETS_PATH);
  wallets.forEach(async (wallet) => {
    const balance = await blxft_contract.balanceOf(wallet.address);
    if (balance.eq(ethers.BigNumber.from(0))) {
      console.log(`${wallet.address} : ${balance} `);
    }
  });
};

check_all();

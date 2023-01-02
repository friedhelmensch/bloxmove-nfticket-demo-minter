require("dotenv").config();
const ethers = require("ethers");
const load_all_wallets = require("./lib/load_all_wallets");
const get_blxm_contract = require("./utils/get_blxm_contract");
const provider = require("./utils/bsc_provider");
const move_wallet = require("./lib/move_wallet");

const consolidate = async (to) => {
  const wallets = await load_all_wallets(process.env.WALLETS_PATH);
  const gasPrice = await provider.getGasPrice();

  wallets.forEach(async (wallet) => {
    try {
      const balance = await provider.getBalance(wallet.address);
      const estimateTxFee = gasPrice.mul(21000);
      const remaining_balance = balance.sub(estimateTxFee);

      const signer = new ethers.Wallet(wallet.privateKey, provider);

      await signer.sendTransaction({
        to: to,
        value: remaining_balance,
      });

      const source_path = `${process.env.WALLETS_PATH}/${wallet.address}.txt`;
      const target_path = `${process.env.EMPTY_WALLETS_PATH}/${wallet.address}.txt`;
      move_wallet(source_path, target_path);
      console.log("sent BNB");
    } catch (e) {
      console.log(e);
    }
  });
};

consolidate("");

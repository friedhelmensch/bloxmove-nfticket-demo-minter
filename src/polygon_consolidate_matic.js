require("dotenv").config();
const ethers = require("ethers");
const load_all_wallets = require("./lib/load_all_wallets");
const provider = require("./utils/provider");
const move_wallet = require("./lib/move_wallet");

const consolidate = async (to) => {
  const wallets = await load_all_wallets(process.env.WALLETS_PATH);

  wallets.forEach(async (wallet) => {
    try {
      const gas_price = await provider.getGasPrice();
      const balance = await provider.getBalance(wallet.address);
      const estimateTxFee = gas_price.mul(21000);
      const remaining_balance = balance.sub(estimateTxFee);

      const signer = new ethers.Wallet(wallet.privateKey, provider);

      await signer.sendTransaction({
        to: to,
        value: remaining_balance,
        gasPrice: gas_price,
      });

      const source_path = `${process.env.WALLETS_PATH}/${wallet.address}.txt`;
      const target_path = `${process.env.EMPTY_WALLETS_PATH}/${wallet.address}.txt`;
      move_wallet(source_path, target_path);
      console.log("sent MATIC");
    } catch (e) {
      console.log(e);
    }
  });
};

consolidate("");

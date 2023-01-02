require("dotenv").config();
const ethers = require("ethers");
const load_all_wallets = require("./lib/load_all_wallets");
const get_blxm_contract = require("./utils/get_blxm_contract");
const provider = require("./utils/bsc_provider");
const move_wallet = require("./lib/move_wallet");

console.log(process.env.WALLETS_PATH);

const consolidate = async (to) => {
  const wallets = await load_all_wallets(process.env.WALLETS_PATH);

  wallets.forEach(async (wallet) => {
    try {
      const signer = new ethers.Wallet(wallet.privateKey, provider);
      const blxm = get_blxm_contract(signer);
      const tx = await blxm.transfer(to, ethers.utils.parseUnits("37.0"), {
        gasLimit: 80000,
      });
      await tx.wait();
      const source_path = `${process.env.WALLETS_PATH}/${wallet.address}.txt`;
      const target_path = `${process.env.EMPTY_WALLETS_PATH}/${wallet.address}.txt`;
      move_wallet(source_path, target_path);
      console.log("sent and tokens moved");
    } catch (e) {
      console.log(e);
    }
  });
};

consolidate("");

require("dotenv").config();
const ethers = require("ethers");
const load_all_wallets = require("./lib/load_all_wallets");
const get_blxft_contract = require("./utils/get_blxft_contract");
const provider = require("./utils/provider");
const get_gas_price = require("./lib/get_gas_price");
const move_wallet = require("./lib/move_wallet");

console.log(process.env.WALLETS_PATH);

const consolidate = async (to) => {
  const wallets = await load_all_wallets(process.env.WALLETS_PATH);

  wallets.forEach(async (wallet) => {
    try {
      const gas_price = await get_gas_price(provider);
      console.log("gas price: " + gas_price.toString());

      const signer = new ethers.Wallet(wallet.privateKey, provider);
      const blxft = get_blxft_contract(signer);
      const tx = await blxft.transfer(to, ethers.utils.parseUnits("37.0"), {
        gasLimit: 80000,
        gasPrice: gas_price,
      });
      await tx.wait();
      console.log("token sent");

      const source_path = `${process.env.WALLETS_PATH}/${wallet.address}.txt`;
      const target_path = `${process.env.EMPTY_WALLETS_PATH}/${wallet.address}.txt`;
      move_wallet(source_path, target_path);
      console.log("tokens moved");
    } catch (e) {
      console.log(e);
    }
  });
};

consolidate("");

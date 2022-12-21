require("dotenv").config();
const ethers = require("ethers");
const load_all_wallets = require("./lib/load_all_wallets");
const get_blxft_contract = require("./utils/get_blxft_contract");
const provider = require("./utils/provider");
const get_gas_price = require("./lib/get_gas_price");

console.log(process.env.WALLETS_PATH);

const consolidate = async (to) => {
  const wallets = await load_all_wallets(process.env.WALLETS_PATH);

  wallets.forEach(async (wallet) => {
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
  });
};

consolidate("");

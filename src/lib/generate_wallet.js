const ethers = require("ethers");
const save_wallet = require("./save_wallet");

const generate_wallet = () => {
  const wallet = ethers.Wallet.createRandom();
  const data = {
    address: wallet.address,
    phrase: wallet.mnemonic.phrase,
    privateKey: wallet.privateKey,
  };

  save_wallet(data);

  return data;
};

module.exports = generate_wallet;

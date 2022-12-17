const ethers = require("ethers");

const generate_wallet = () => {
  const wallet = ethers.Wallet.createRandom();
  const data = {
    address: wallet.address,
    phrase: wallet.mnemonic.phrase,
    privateKey: wallet.privateKey,
  };
  return data;
};

module.exports = generate_wallet;

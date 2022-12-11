require("dotenv").config();
const ethers = require("ethers");
const provider = require("./provider");

const send_matic = async (private_key_sender, to, amount) => {
  const signer = new ethers.Wallet(private_key_sender, provider);
  const gasPrice = (await provider.getGasPrice()) * 2;
  const nonce = await provider.getTransactionCount(signer.address);

  const tx = await signer.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(amount),
    gasPrice: gasPrice,
    nonce: nonce,
    gasLimit: 1000000,
  });

  var receipt = await tx.wait();
  console.log(`sent ${amount} matic to ${to}`);
};

module.exports = send_matic;

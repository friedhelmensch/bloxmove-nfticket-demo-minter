require("dotenv").config();
const ethers = require("ethers");
const provider = require("../utils/provider");
const get_gas_price = require("./get_gas_price");

const send_matic = async (private_key_sender, to, amount) => {
  const signer = new ethers.Wallet(private_key_sender, provider);
  const gasPrice = await get_gas_price(provider);

  const tx = await signer.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(amount),
    gasPrice: gasPrice,
    gasLimit: 1000000,
  });

  var receipt = await tx.wait();
  console.log(`sent ${amount} matic to ${to}`);
};

module.exports = send_matic;

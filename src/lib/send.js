const ethers = require("ethers");
const provider = require("../utils/provider");

const send = async (signer, get_gas_price, to, amount) => {
  const gas_Price = await get_gas_price(provider);

  const tx = await signer.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(amount),
    gasLimit: 100000,
    gasPrice: gas_Price,
  });

  var receipt = await tx.wait();
  return receipt;
};

module.exports = send;

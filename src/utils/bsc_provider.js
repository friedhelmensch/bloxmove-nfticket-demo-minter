const ethers = require("ethers");
const bscProvider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/",
  { name: "binance", chainId: 56 }
);

module.exports = bscProvider;

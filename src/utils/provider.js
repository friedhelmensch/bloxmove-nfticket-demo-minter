const ethers = require("ethers");

let provider = new ethers.providers.InfuraProvider(
  "matic",
  process.env.INFURA_PROJECTID
);

module.exports = provider;

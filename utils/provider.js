const ethers = require("ethers");
require("dotenv").config();

let provider = new ethers.providers.InfuraProvider(
  "matic",
  process.env.INFURA_PROJECTID
);

module.exports = provider;

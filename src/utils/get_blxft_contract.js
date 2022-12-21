const ethers = require("ethers");

const erc20abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const get_blxft_contract = (signer) => {
  const blxft_contract = new ethers.Contract(
    "0x6e25f32B47914C5996d348e2E7E4fCe204513ECe",
    erc20abi,
    signer
  );

  return blxft_contract;
};

module.exports = get_blxft_contract;

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

const get_blxft_contract = (signerOrProvider) => {
  const blxft_contract = new ethers.Contract(
    "0x40E51e0eC04283e300F12f6bB98DA157Bb22036E",
    erc20abi,
    signerOrProvider
  );

  return blxft_contract;
};

module.exports = get_blxft_contract;

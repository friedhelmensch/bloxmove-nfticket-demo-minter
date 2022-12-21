const fs = require("fs");
const load_wallet = require("./load_wallet");

const load_all_wallets = (path) => {
  const files = fs.readdirSync(path);
  return files
    .filter((fileName) => fileName.startsWith("0x"))
    .map((fileName) => load_wallet(`${path}/${fileName}`));
};

module.exports = load_all_wallets;

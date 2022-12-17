const fs = require("fs");

const save_wallet = (path, wallet) => {
  fs.writeFileSync(`${path}/${wallet.address}.txt`, JSON.stringify(wallet));
};

module.exports = save_wallet;

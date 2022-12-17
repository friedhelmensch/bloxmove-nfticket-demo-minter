const fs = require("fs");

const save_wallet = (wallet) => {
  fs.writeFileSync(
    `${process.env.WALLETS_PATH}/${wallet.address}`,
    JSON.stringify(wallet)
  );
};

module.exports = save_wallet;

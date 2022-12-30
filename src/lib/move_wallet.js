const fs = require("fs");

const move_wallet = (oldPath, newPath) => {
  fs.renameSync(oldPath, newPath);
};

module.exports = move_wallet;

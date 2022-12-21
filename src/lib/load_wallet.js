const fs = require("fs");

const load_wallet = (path) => {
  return JSON.parse(
    fs.readFileSync(path, {
      encoding: "utf8",
      flag: "r",
    })
  );
};

module.exports = load_wallet;

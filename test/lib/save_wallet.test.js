const generate_wallet = require("../../src/lib/generate_wallet");
const save_wallet = require("../../src/lib/save_wallet");
const fs = require("fs");
var expect = require("chai").expect;
const path = `${__dirname}/test_wallets`;

describe("save_wallet", function () {
  it("saves a wallet", function () {
    const wallet = generate_wallet();
    save_wallet(path, wallet);

    const saved_wallet = read_wallet(`${path}/${wallet.address}.txt`);
    expect(saved_wallet).to.deep.equal(wallet);
  });

  after(() => {
    console.log("after mafter");
  });
});

const read_wallet = (path) => {
  return JSON.parse(
    fs.readFileSync(path, {
      encoding: "utf8",
      flag: "r",
    })
  );
};

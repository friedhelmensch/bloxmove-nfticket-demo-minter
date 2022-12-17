const generate_wallet = require("../../src/lib/generate_wallet");
const save_wallet = require("../../src/lib/save_wallet");

const fs = require("fs");
const fsPromises = require("fs/promises");

var expect = require("chai").expect;
const path = require("path");
const wallet_path = `${__dirname}/test_wallets`;

describe("save_wallet", function () {
  it("saves a wallet", function () {
    const wallet = generate_wallet();
    save_wallet(wallet_path, wallet);

    const saved_wallet = read_wallet(`${wallet_path}/${wallet.address}.txt`);
    expect(saved_wallet).to.deep.equal(wallet);
  });

  before(async () => {
    await create_test_wallet_folder();
  });

  after(async () => {
    await delete_test_wallets();
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

const create_test_wallet_folder = async () => {
  if (!fs.existsSync(wallet_path)) {
    fs.mkdirSync(wallet_path);
  }
};

const delete_test_wallets = async () => {
  const files = await fsPromises.readdir(wallet_path);
  for (const file of files) {
    await fsPromises.unlink(path.resolve(wallet_path, file));
  }
};

const generate_wallet = require("../../src/lib/generate_wallet");
const save_wallet = require("../../src/lib/save_wallet");
const load_wallet = require("../../src/lib/load_wallet");
const load_all_wallets = require("../../src/lib/load_all_wallets");
const move_wallet = require("../../src/lib/move_wallet");

const fs = require("fs");
const fsPromises = require("fs/promises");

var expect = require("chai").expect;
const path_lib = require("path");
const wallet_path = `${__dirname}/test_wallets/`;
const moved_wallet_path = `${__dirname}/test_wallets_moved/`;

describe("wallet operations", function () {
  it("saves and loads a wallet", function () {
    const wallet = generate_wallet();
    save_wallet(wallet_path, wallet);

    const saved_wallet = load_wallet(`${wallet_path}/${wallet.address}.txt`);
    expect(saved_wallet).to.deep.equal(wallet);
  });

  it("loads all wallets from a folder", function () {
    const saved_wallets = generate_saved_wallets(wallet_path, 4);
    const loaded_wallets = load_all_wallets(wallet_path);

    expect(saved_wallets).to.have.length(loaded_wallets.length);
    loaded_wallets.forEach((e) => expect(saved_wallets).to.deep.include(e));
  });

  it("move wallet", function () {
    const wallet = generate_wallet();
    save_wallet(wallet_path, wallet);

    const sourcePath = `${wallet_path}/${wallet.address}.txt`;
    const target_path = `${moved_wallet_path}/${wallet.address}.txt`;

    move_wallet(sourcePath, target_path);
    const moved_wallet = load_wallet(target_path);
    expect(wallet).to.deep.equal(moved_wallet);
  });

  this.beforeEach(async () => {
    await create_test_wallet_folder();
  });

  this.afterEach(async () => {
    await delete_test_wallets();
  });
});

const generate_saved_wallets = (path, wallet_count) => {
  const wallets = [];

  for (let i = 0; i < wallet_count; i++) {
    let wallet = generate_wallet();
    save_wallet(path, wallet);
    wallets.push(wallet);
  }
  return wallets;
};

const create_test_wallet_folder = async () => {
  if (!fs.existsSync(wallet_path)) {
    fs.mkdirSync(wallet_path);
  }
  if (!fs.existsSync(moved_wallet_path)) {
    fs.mkdirSync(moved_wallet_path);
  }
};

const delete_test_wallets = async () => {
  const wallets = await fsPromises.readdir(wallet_path);
  for (const wallet of wallets) {
    await fsPromises.unlink(path_lib.resolve(wallet_path, wallet));
  }
  const moved_wallets = await fsPromises.readdir(moved_wallet_path);
  for (const moved_wallet of moved_wallets) {
    await fsPromises.unlink(path_lib.resolve(moved_wallet_path, moved_wallet));
  }
};

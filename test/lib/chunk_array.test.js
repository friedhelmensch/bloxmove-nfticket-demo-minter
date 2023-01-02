const { expect } = require("chai");
const chunk_array = require("../../src/lib/chunk_array");
const generate_wallet = require("../../src/lib/generate_wallet");

describe("chunk_array", function () {
  it("chunks accordingly", async function () {
    const wallets = generate_wallets(8);
    const chunked_wallets = chunk_array(wallets, 3);
    expect(chunked_wallets.length).to.eq(3);
  });
});

const generate_wallets = (wallet_count) => {
  const wallets = [];
  for (let i = 0; i < wallet_count; i++) {
    let wallet = generate_wallet();
    wallets.push(wallet);
  }
  return wallets;
};

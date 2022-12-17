const generate_wallet = require("../../src/lib/generate_wallet");
const ethers = require("ethers");

var expect = require("chai").expect;

describe("generate_wallet", function () {
  it("generates a valid ethereum wallet", async function () {
    const wallet = generate_wallet();

    const address = ethers.utils.computeAddress(wallet.privateKey);
    expect(wallet.address).to.be.equal(address);

    let from_phrase = ethers.Wallet.fromMnemonic(wallet.phrase);
    expect(wallet.privateKey).to.be.equal(from_phrase.privateKey);
  });
});

const get_gas_price = require("../../src/lib/get_gas_price");
var expect = require("chai").expect;

describe("get_gas_price", function () {
  it("multiplies and rounds the gas price", async function () {
    const base_price = 12.3;
    const provider = get_provider(base_price);
    const gas_price = await get_gas_price(provider);

    expect(gas_price).to.be.equal(Math.round(base_price * 1.2));
  });
});

const get_provider = (price) => {
  const provider = { getGasPrice: () => price };
  return provider;
};

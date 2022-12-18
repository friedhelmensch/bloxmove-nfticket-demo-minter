const send = require("../../src/lib/send");
const ethers = require("ethers");

var expect = require("chai").expect;

const gas_price = 4560.13;

describe("send", function () {
  it("sends correct amount with appropriate parameters", async function () {
    //prepare
    const amount = "0.23";
    const expectedOptions = get_expected_options(
      "0x1234",
      "230000000000000000",
      100000
    );

    const expected_receipt = "I expect success";
    const signer = get_signer(expectedOptions, expected_receipt);

    //act
    const receipt = await send(signer, get_gas_price, "0x1234", amount);

    //verify
    expect(receipt).to.equal(expected_receipt);
  });
});

const get_expected_options = (to, amount, gas_limit) => {
  const expected_options = {
    to: to,
    value: amount,
    gasLimit: gas_limit,
  };
  return expected_options;
};

const get_signer = (expectedOptions, expectedReceipt) => {
  const signer = {
    sendTransaction: async (options) => {
      expect(options.to).to.deep.equal(expectedOptions.to);
      expect(options.value.toString()).to.deep.equal(expectedOptions.value);
      expect(options.gasPrice).to.deep.equal(gas_price);
      expect(options.gasLimit).to.deep.equal(expectedOptions.gasLimit);
      const tx = {
        wait: async () => {
          return expectedReceipt;
        },
      };
      return tx;
    },
  };

  return signer;
};

const get_gas_price = async (provider) => {
  return gas_price;
};

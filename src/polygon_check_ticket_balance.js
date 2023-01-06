require("dotenv").config();
const ethers = require("ethers");
const { BigNumber } = require("ethers");
const provider = require("./utils/provider");
const get_nfticket_contract = require("./utils/polygon_get_nfticket_contract");
const get_gas_price = require("./lib/get_gas_price");

const zero = BigNumber.from(0);

const get_ticket_balances = async (to) => {
  const signer = new ethers.Wallet(process.env.SPENDER_PRIVATEKEY, provider);
  const nfticket = get_nfticket_contract(signer);

  for (let i = 0; i < 3000; i++) {
    try {
      const balance = await nfticket.getTicketBalance(i);
      if (balance.gt(zero)) {
        const gas_Price = get_gas_price(provider);
        await nfticket.withDrawERC20(
          i,
          "0x6e25f32b47914c5996d348e2e7e4fce204513ece",
          balance,
          to,
          {
            gasPrice: gas_Price,
          }
        );
        console.log(`claimed tokens for ticket: ${i} : ${balance.toString()}`);
      }
    } catch (e) {
      console.log(`error for ticket id: ${i}`);
    }
  }
};

get_ticket_balances("0x....");

require("dotenv").config();
const generate_wallet = require("./generate_wallet");
const send = require("./send_matic");
const get_erc_20 = require("./get_erc_20");
const add_balance_to_ticket = require("./add_balance_to_ticket");
const redeem_ticket = require("./redeem_ticket");
const get_contract = require("./get_contract");
const mint_nft = require("./mint_nft");
const ethers = require("ethers");
const provider = require("./provider");

const doIt = async () => {
  for (let i = 0; i < 1; i++) {
    console.log(`----- ${i} -------`);
    const { privateKey, address } = generate_wallet();
    await send(process.env.SPENDER_PRIVATEKEY, address, "0.2");
    await mint_nft_get_37_tokens(privateKey);
  }
};

const mint_nft_get_37_tokens = async (private_key) => {
  const signer = new ethers.Wallet(private_key, provider);
  console.log(`mint nft and get 37 tokens for ${signer.address}`);

  const NFTicketDemoServiceContract = get_contract(signer);

  const token_id = await mint_nft(
    signer.address,
    provider,
    NFTicketDemoServiceContract
  );

  await redeem_ticket(
    token_id,
    signer.address,
    provider,
    NFTicketDemoServiceContract
  );

  await add_balance_to_ticket(
    token_id,
    signer.address,
    provider,
    NFTicketDemoServiceContract
  );

  await get_erc_20(
    token_id,
    signer.address,
    provider,
    NFTicketDemoServiceContract
  );
};

doIt();

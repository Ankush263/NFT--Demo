require('dotenv').config();

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const contract = require('../artifacts/contracts/MyNFT.sol/MyNFT.json');

const API_URL = process.env.GOERLI_URL

const web3 = createAlchemyWeb3(
  `${API_URL}`
);

// console.log(JSON.stringify(contract.abi))

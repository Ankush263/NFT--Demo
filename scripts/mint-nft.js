require('dotenv').config();

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const contract = require('../artifacts/contracts/MyNFT.sol/MyNFT.json');

const PUBLIC_KEY = process.env.PUBLIC_KEY

const PRIVATE_KEY = process.env.PRIVATE_KEY

const API_URL = process.env.GOERLI_URL

const web3 = createAlchemyWeb3(`${API_URL}`);

// console.log(JSON.stringify(contract.abi))

const contractAddress = '0xcFF8b8e37AFa849531F05bA365740473BFf30620'

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI){

  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest')

  const tx = {

    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()

  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)

  signPromise
    .then((signedTx) => {

      web3.eth.sendSignedTransaction(

        signedTx.rawTransaction,
       
        function(err, hash) {

          if(!err) {

            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nChack Alchemy's Mempool to view the status of your transaction!"
            )

          }else{

          console.log("Error: ", err)

        }

      }

    )

  })

  .catch((err) => {

    console.log("Promise failed: ", err)

  })

  
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmaPzjHrHiQYLVetHBj8Wo4F5tAP5QorRFdyoG3kiC1CwL")

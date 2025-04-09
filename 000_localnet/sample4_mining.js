const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');

async function main() {
  try {
    // get block number
    const blocknumber_before = await web3.eth.getBlockNumber();
    console.log(`latest Block: ${blocknumber_before}`);

    // send Transaction
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];
    const receiver = accounts[1];
    const tx = await web3.eth.sendTransaction({
      from: sender,
      to: receiver,
      gas: 21000, // gas limit
      value: web3.utils.toWei('10', 'ether'), // 10 ETH
      gasPrice: web3.utils.toWei('20', 'gwei'),  // gas price
    });

    console.log("Transaction sent. Tx Hash:", tx.transactionHash);

    // Generate blocks manually
    console.log("Starting mining...");

    await web3.currentProvider.request({
      method: "evm_mine",
      params: []
    });

    console.log("Mining successful!");

    // get block number
    const blocknumber_after = await web3.eth.getBlockNumber();
    console.log(`latest Block: ${blocknumber_after}`);

  } catch (err) {
    console.error('Error during mining:', err.message);
  }
}

main();

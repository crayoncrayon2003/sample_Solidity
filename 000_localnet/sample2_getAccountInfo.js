const { Web3 } = require('web3');

const web3 = new Web3('http://127.0.0.1:8545');

async function main() {
  try {
    // get list of Accounts
    const accounts = await web3.eth.getAccounts();
    const account0 = accounts[0];

    // Confirm current etherbase
    let currentBase = await web3.eth.getCoinbase();
    console.log(`(1) Current etherbase: ${currentBase}`);

    // Setup account0 at Etherbase
    await web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'miner_setEtherbase',
      params: [account0],
      id: new Date().getTime()
    }, (err, res) => {
      if (err) {
        console.error('Error setting etherbase:', err.message);
      } else {
        console.log(`(2) Etherbase set to : ${account0}`);
      }
    });

    setTimeout(async () => {
        // Confirm current etherbase
        const updatedBase = await web3.eth.getCoinbase();
        console.log(`(3) Current etherbase: ${updatedBase}`);

        // get account0's info
        const balance = await web3.eth.getBalance(account0);
        const nonce = await web3.eth.getTransactionCount(account0);

        console.log(`(4) Account 0 Info`);
        console.log(`    Address: ${account0}`);
        console.log(`    Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        console.log(`    Nonce  : ${nonce}`);
    }, 1000);

  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

main();

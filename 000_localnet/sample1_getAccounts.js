const { Web3 } = require('web3');

const web3 = new Web3('http://127.0.0.1:8545');

web3.eth.getAccounts().then(accounts => {
  console.log('Available Accounts:');
  accounts.forEach((account, index) => {
    console.log(`(${index}) ${account}`);
  });
}).catch(error => {
  console.error('Error fetching accounts:', error);
});

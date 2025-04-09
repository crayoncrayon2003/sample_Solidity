const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');

async function main() {
  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];
  const receiver = accounts[1];

  const balance0_before = await web3.eth.getBalance(sender);
  const balance1_before = await web3.eth.getBalance(receiver);

  console.log('=== Before Transaction ===');
  console.log(`Account 0 (sender)  : ${sender}`);
  console.log(`  Balance: ${web3.utils.fromWei(balance0_before, 'ether')} ETH`);
  console.log(`Account 1 (receiver): ${receiver}`);
  console.log(`  Balance: ${web3.utils.fromWei(balance1_before, 'ether')} ETH`);

  const tx = await web3.eth.sendTransaction({
    from: sender,
    to: receiver,
    gas: 21000, // gas limit
    value: web3.utils.toWei('10', 'ether'), // 10 ETH
    gasPrice: web3.utils.toWei('20', 'gwei'),  // gas prices
  });

  const balance0_after = await web3.eth.getBalance(sender);
  const balance1_after = await web3.eth.getBalance(receiver);

  console.log('\n=== Transaction Info ===');
  console.log(`Tx Hash: ${tx.transactionHash}`);

  console.log('\n=== After Transaction ===');
  console.log(`Account 0 (sender)  : ${sender}`);
  console.log(`  Balance: ${web3.utils.fromWei(balance0_after, 'ether')} ETH`);
  console.log(`Account 1 (receiver): ${receiver}`);
  console.log(`  Balance: ${web3.utils.fromWei(balance1_after, 'ether')} ETH`);
}

main().catch((err) => {
  console.error('Error:', err.message);
});

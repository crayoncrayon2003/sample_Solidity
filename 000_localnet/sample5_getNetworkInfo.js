const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');

async function main() {
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    const networkId = await web3.eth.net.getId();
    const chainId = await web3.eth.getChainId();
    const gasPrice = await web3.eth.getGasPrice();
    const isListening = await web3.eth.net.isListening();
    const peerCount = await web3.eth.net.getPeerCount();

    console.log('=== Ethereum Network Info ===');
    console.log(`Block Number   : ${blockNumber}`);
    console.log(`Network ID     : ${networkId}`);
    console.log(`Chain ID       : ${chainId}`);
    console.log(`Raw Gas Price  : ${gasPrice}`);
    console.log(`Is Listening   : ${isListening}`);
    console.log(`Peer Count     : ${peerCount}`);
  } catch (err) {
    console.error('Error getting network info:', err.message);
  }
}

main();

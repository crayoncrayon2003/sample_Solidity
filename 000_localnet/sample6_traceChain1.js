const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:8545'); // GanacheのRPC URL

async function main() {
  try {
    // get number of block
    const latestBlockNumber = await web3.eth.getBlockNumber();
    console.log(`Latest Block Number: ${latestBlockNumber}`);

    console.log("Traversing from Genesis block to the latest block...");

    // Trace block : genesis block -> latest Block
    for (let i = 0; i <= latestBlockNumber; i++) {
      const block = await web3.eth.getBlock(i);
      console.log(`Block ${i}: Hash -> ${block.hash}, Transactions -> ${block.transactions.length}`);
    }

    console.log("Traversal completed!");

  } catch (err) {
    console.error("Error while traversing blocks:", err.message);
  }
}

main();

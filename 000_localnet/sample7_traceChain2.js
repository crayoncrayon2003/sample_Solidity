const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:8545'); // GanacheのRPC URL

async function main() {
  try {
    // get latest block
    let currentBlock = await web3.eth.getBlock("latest");
    console.log(`Latest Block: ${currentBlock.number}, Hash: ${currentBlock.hash}`);

    console.log("Traversing blocks from latest to genesis...");

    // Trace block : latest Block -> genesis block
    while (currentBlock.number > 0) {
      currentBlock = await web3.eth.getBlock(currentBlock.parentHash);

      // show block info
      console.log(`Block ${currentBlock.number}: Hash -> ${currentBlock.hash}, Parent -> ${currentBlock.parentHash}`);
    }

    console.log("Reached Genesis Block!");

  } catch (err) {
    console.error("Error while traversing blocks:", err.message);
  }
}

main();

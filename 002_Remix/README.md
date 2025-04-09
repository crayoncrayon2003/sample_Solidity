# Install
```
npm install -g ganache-cli
npm install -g remixd
```

# Start ethereum node
```
ganache-cli
```

# Start Remix
```
mkdir ./project
remixd -s ./project --remix-ide https://remix.ethereum.org
```

Custom - External Http Provide

# How to use
1. http://localhost:8080/
2. File Exploler -> Open a File from your File System
   Select ./project/HelloWorld.sol
3. Solidity Compiler
   Push "Complie HelloWorld.sol"
4. Deploy & Run Transactions
   Configure the following.
    * ENVIROMENT : select ethereum network for deploy solidity
        * Remix VM(Cancum)                  : this is Remix ethereum network
        * Custuom -External Http Provider   : this is local ethereum network "http://127.0.0.1:8545"
    * ACCOUNT    : select account for deploy solidity
    * GAS LIMIT  : 2000000
    * VALUE      : 0 wei
    * CONTRACT   : HelloWorld.sol
    push "Deploy"
5. Deploy & Run Transactions -> Deployed Contracts
   Select the pull-down & Push message

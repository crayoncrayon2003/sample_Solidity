# Install
```
npm init -y
npm install -g truffle
npm install -g ganache-cli
```

# project
## create project
```
npx truffle init
```

* contracts/        :  solidity file(*sol)
* migrations/       :  deploy script
* test/             :  test code (*js)
* truffle-config.js :  config file


## setting
truffle-config.js

```
development: {
    host: "127.0.0.1",
    port: 8545,
    network_id: "*",
},
...
compilers: {
    solc: {
        ...
        version: "0.8.25",
        ...
    }
}
```

## create solidity file
contracts/HelloWorld.sol

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract HelloWorld {
    string public message = "Hello Truffle!";
}
```

# compile
```
npx truffle compile
```

# run develop ethereum node
```
npx truffle develop
truffle(develop)> migrate --reset
truffle(develop)> test
...
truffle(develop)> .exit
```

# run local ethereum node
## start ethereum node
```
npx ganache-cli
```

## run test
```
npx truffle test
```

## deploy
### case1
```
npx truffle migrate
```

### case2
```
npx truffle migrate --reset --compile-all --network development
```

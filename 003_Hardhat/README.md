# Install
```
npm init -y
npm install -g truffle
npm install -g ganache-cli
npm install -g hardhat
```

# project
## create project
```
hardhat
```

* contracts/        :  solidity file(*sol)
* ignition/         :  deploy script
* test/             :  test code (*js)
* hardhat.config.js :  config file

## setting
hardhat.config.js

```
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  }
};
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

contracts/Lock.sol
```
pragma solidity ^0.8.25;
```

## create solidity file
ignition/HelloWorld.js

```
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HelloWorldModule", (m) => {
  const hello = m.contract("HelloWorld");
  return { hello };
});
```


# compile
```
npx hardhat compile
```

# run ethereum node & deply
## run ethereum node
```
npx hardhat node
```

## deply
```
npx hardhat ignition deploy ./ignition/modules/HelloWorld.js --network localhost
```

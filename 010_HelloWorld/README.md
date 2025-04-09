# Install
```
npm init -y
npm install -g truffle
npm install -g ganache-cli
npm install -g hardhat
```

# start ethereum node
```
npx hardhat node
```

# compile
```
npx hardhat compile
```

# deply
## HelloWorld1
```
npx hardhat ignition deploy ./ignition/modules/HelloWorld1.js --network localhost
```

## HelloWorld2
```
npx hardhat ignition deploy ./ignition/modules/HelloWorld2.js --network localhost
```

# test
```
npx hardhat test
```


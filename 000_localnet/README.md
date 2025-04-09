# ethereum network
## Install
```
npm install -g ganache
```

## check version
```
ganache --version
> ganache v7.9.2
```

## help
```
ganache-cli --help
> ganache v7.9.2
```

## Run custum ethereum network
### mode : default
```
ganache-cli -g genesis.json
```

### mode : manually mining
```
ganache-cli -g genesis.json --blockTime 0 --networkId 1337 --gasPrice 20000000000
```

### mode : automatically mining (10 sec)
```
ganache-cli -g genesis.json --blockTime 10 --networkId 1337 --gasPrice 20000000000
```

### Output
Account (auto-generated). Each account has 100 eth.
```
> Available Accounts
> ==================
> (0) 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX (100 ETH)
> (1) 0xYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY (100 ETH)
....
> (9) 0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ (100 ETH)
```

Private Keys of Account.
```
Private Keys
(0) 0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
(1) 0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
....
(9) 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
```

# operation example
## Install
```
npm install -g web3
```

## Get list of account
```
node sample1_getAccounts.js
```

## Get Infomation of account0
```
node sample2_getAccountInfo.js
```

## send ether
```
node sample3_sendEtherAccount0ToAccount1.js
```

## Get Infomation of network
```
node sample4_mining.js
```

## Get Infomation of network
```
node sample5_getNetworkInfo.js
```

## Trace the chain1
```
node sample6_traceChain1.js
```

## Trace the chain2
```
node sample7_traceChain2.js
```
// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.28;

contract OneData {
    bytes32 private hash;
    address[] public next;
    address[] public prev;

    event NotifyElement(address indexed addr, bytes32 hash);

    constructor(bytes32 _hash) {
        hash = _hash;
    }

    function setNext(address _addr) public {
        next.push(_addr);
    }

    function setPrev(address _addr) public {
        prev.push(_addr);
    }

    function getHash() public view returns (bytes32) {
        return hash;
    }

    function isIncludeAddress(address _addr) public view returns (bool) {
        if (_addr == address(this)) {
            return true;
        }
        for (uint256 idx = 0; idx < next.length; idx++) {
            if (OneData(next[idx]).isIncludeAddress(_addr)) {
                return true;
            }
        }
        return false;
    }

    function show() public {
        emit NotifyElement(address(this), hash);
        for (uint256 idx = 0; idx < next.length; idx++) {
            OneData(next[idx]).show();
        }
    }
}

contract TraceData {
    OneData public list;

    constructor() {
        list = new OneData(sha256(abi.encodePacked("genesis data")));
    }

    function makeNowHash(bytes32 _preHash, string memory _nowData, string memory _time) private pure returns (bytes32) {
        return sha256(abi.encodePacked(_preHash, sha256(abi.encodePacked(_nowData)), _time));
    }

    function makePrevHash(address[] memory _storeAddr) private view returns (bytes32) {
        bytes32 preHash = OneData(_storeAddr[0]).getHash();
        for (uint256 idx = 1; idx < _storeAddr.length; idx++) {
            preHash = sha256(abi.encodePacked(preHash, OneData(_storeAddr[idx]).getHash()));
        }
        return preHash;
    }

    function add(address[] memory _storeAddr, string[] memory _nowData, string memory _time) public returns (address[] memory _ret) {
        require((_storeAddr.length == 1 && _nowData.length > 1) || (_storeAddr.length > 1 && _nowData.length == 1), "Invalid input lengths");

        _ret = new address[](_nowData.length);
        bytes32 preHash = makePrevHash(_storeAddr);

        if (_storeAddr.length == 1) {
            for (uint256 idx = 0; idx < _nowData.length; idx++) {
                bytes32 nowHash = makeNowHash(preHash, _nowData[idx], _time);
                OneData nowNode = new OneData(nowHash);
                nowNode.setPrev(_storeAddr[0]);
                OneData(_storeAddr[0]).setNext(address(nowNode));
                _ret[idx] = address(nowNode);
            }
        } else {
            bytes32 nowHash = makeNowHash(preHash, _nowData[0], _time);
            OneData nowNode = new OneData(nowHash);
            for (uint256 idx = 0; idx < _storeAddr.length; idx++) {
                nowNode.setPrev(_storeAddr[idx]);
                OneData(_storeAddr[idx]).setNext(address(nowNode));
            }
            _ret[0] = address(nowNode);
        }
    }

    function show() public {
        list.show();
    }
}

contract Traceability {
    TraceData[] public traceList;

    event TraceCreated(uint256 traceNo, address storeAddr);
    event NotifyElement(address indexed addr, bytes32 hash);

    function create() public returns (uint256 _traceNo, address _storeAddr) {
        traceList.push(new TraceData());
        _traceNo = traceList.length - 1;
        _storeAddr = address(traceList[_traceNo]);

        emit TraceCreated(_traceNo, _storeAddr);
    }

    modifier checkTraceNo(uint256 _checkTraceNo) {
        require(_checkTraceNo < traceList.length, "Invalid trace number");
        _;
    }

    function add(uint256 _traceNo, address[] memory _storeAddr, string[] memory _nowData, string memory _time) public checkTraceNo(_traceNo) returns (address[] memory ret) {
        ret = traceList[_traceNo].add(_storeAddr, _nowData, _time);
    }

    function show(uint256 _traceNo) public checkTraceNo(_traceNo) {
        emit NotifyElement(address(this), keccak256(abi.encodePacked("trace", _traceNo)));
    }
}

//SPDX-License-Identifier: Apache-2.0
pragma solidity >= 0.8.28;

contract AdressSample11{
    function getThisAddress() public view returns(address) {
        return address(this);
    }

    function getMsgAddress() public view returns(address) {
        return msg.sender;
    }
}

contract AdressSample12 {
    AdressSample11 public tmp;

    constructor(address _adressSample11) {
        tmp = AdressSample11(_adressSample11);
    }

    function getThisAddress() public view returns (address) {
        return tmp.getThisAddress();
    }

    function getMsgAddress() public view returns (address) {
        return tmp.getMsgAddress();
    }
}

// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.28;

contract EtherSample {
    // Allow the contract to receive Ether
    receive() external payable {}

    function getEther() public view returns (uint _wei, uint _ether) {
        uint amount = address(this).balance;
        _wei = amount / 1 wei;
        _ether = amount / 1 ether;
    }
}
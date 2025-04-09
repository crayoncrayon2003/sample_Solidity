// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.28;

contract Inheritance21_Owned {
    address payable public ownerAddr;
    string public ownerName;

    /* constructor */
    constructor(string memory _ownerName) {
        ownerAddr = payable(msg.sender);
        ownerName = _ownerName;
    }

    receive() external payable {}
    fallback() external payable {}

    /* method */
    function withdrawFunds() public {
        require(ownerAddr == payable(msg.sender), "owner err");
        require(address(this).balance > 0, "No funds to withdraw");
        ownerAddr.transfer(address(this).balance);
    }
}
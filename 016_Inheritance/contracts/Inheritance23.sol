// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.28;

contract Inheritance23_Owned {
    address payable public ownerAddr;
    string public ownerName;

    /* constructor */
    constructor(string memory _ownerName) {
        ownerAddr = payable(msg.sender);
        ownerName = _ownerName;
    }

    modifier onlyOwner {
        require(ownerAddr == payable(msg.sender), "owner err");
        _;
    }
}

contract Inheritance23_Mortal is Inheritance23_Owned {
    constructor(string memory _ownerName) Inheritance23_Owned(_ownerName) {}

    receive() external payable {}
    fallback() external payable {}

    function destroy() public onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        ownerAddr.transfer(address(this).balance);
    }
}

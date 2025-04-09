// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.28;

contract Inheritance24_Owned {
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

contract Inheritance24_Mortal is Inheritance24_Owned {
    constructor(string memory _ownerName) Inheritance24_Owned(_ownerName) {}

    receive() external payable {}
    fallback() external payable {}

    function withdrawFunds() public onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        ownerAddr.transfer(address(this).balance);
    }
}

contract Inheritance24_Faucet is Inheritance24_Mortal {
    event Withdrawal(address indexed to, uint amount);
    event Deposit(address indexed from, uint amount);

    constructor(string memory _ownerName) Inheritance24_Mortal(_ownerName) {}

    // Provide Ether to requesters
    function withdraw(uint withdrawAmount) public {
        // Withdrawal limit
        require(withdrawAmount <= 0.1 ether, "withdrawAmount err");
        require(address(this).balance >= withdrawAmount, "Insufficient balance in faucet for withdrawal request");

        // Send Ether to the requester's address
        payable(msg.sender).transfer(withdrawAmount);
        emit Withdrawal(msg.sender, withdrawAmount);
    }

    // Accept deposits
    function pay() public payable {
        emit Deposit(msg.sender, msg.value);
    }
}

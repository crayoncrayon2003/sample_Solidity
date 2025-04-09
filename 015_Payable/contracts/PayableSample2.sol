//SPDX-License-Identifier: Apache-2.0
pragma solidity >= 0.8.28;

contract PayableSample2{
    fallback() external payable {}
    receive() external payable {}

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function transfer() public {
        payable(msg.sender).transfer(address(this).balance);
    }

}

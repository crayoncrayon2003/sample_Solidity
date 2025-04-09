//SPDX-License-Identifier: Apache-2.0
pragma solidity >= 0.8.28;

contract PayableSample11{
    receive() external payable {}
    fallback() external payable {}

    function pay1() public payable {}       //OK
    function pay2() external payable {}     //OK
    //function pay3() internal payable {}   //NG
}
contract PayableSample12{
    //fallback() public payable {}      //NG
    fallback() external payable {}
    //fallback() internal payable {}    //NG
}
contract PayableSample13{
    //receive() public payable {}       //NG
    receive() external payable {}       //NG
    //receive() internal payable {}     //NG
}

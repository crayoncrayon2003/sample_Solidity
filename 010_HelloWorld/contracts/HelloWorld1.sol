//SPDX-License-Identifier: Apache-2.0
pragma solidity >= 0.8.28;

contract HelloWorld1{
    function say()  public pure returns(string memory out){
        out = "Hellow World";
    }
}
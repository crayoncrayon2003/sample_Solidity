//SPDX-License-Identifier: Apache-2.0
pragma solidity >= 0.8.28;

contract HelloWorld2{
    string public greeting;

    /* constructor */
    constructor (string memory _greeting) {
        greeting = _greeting;
    }

    /* set method */
    function setWord(string memory _greeting) public{
        greeting = _greeting;
    }

    /* get method */
    function getWord() public view returns(string memory _out){
        _out = greeting;
    }

}
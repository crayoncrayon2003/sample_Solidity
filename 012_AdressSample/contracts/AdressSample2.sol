// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.28;

contract AdressSample2 {
    mapping(address => uint) private member; // Set as private for better security

    // Function to set value for a specific address
    function setValue_To(address _to, uint _value) public {
        member[_to] = _value;
    }

    // Function to set value for the message sender
    function setValue_MsgSender(uint _value) public {
        member[msg.sender] = _value;
    }

    // Function to set value for the contract itself
    function setValue_This(uint _value) public {
        member[address(this)] = _value;
    }

    // Function to get value assigned to a specific address
    function getValue_To(address _to) public view returns (uint) {
        return member[_to];
    }

    // Function to get value for the message sender
    function getValue_MsgSender() public view returns (uint) {
        return member[msg.sender];
    }

    // Function to get value for the contract itself
    function getValue_This() public view returns (uint) {
        return member[address(this)];
    }

    // Function to check if an address is a member
    function isMember(address _addr) public view returns (bool) {
        return member[_addr] > 0; // Simplified condition
    }
}

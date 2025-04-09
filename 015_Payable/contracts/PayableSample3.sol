// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.28;

contract PayableSample3 {
    // Allow contract to receive Ether
    receive() external payable {} 
    fallback() external payable {}

    function getBalance(address _target) public view returns (uint) {
        address tmp = _target;
        if (tmp == address(0)) {
            tmp = address(this);
        }
        return tmp.balance;
    }

    function transfer(address payable _to, uint _amount) public {
        _to.transfer(_amount);
    }

    function send(address payable _to, uint _amount) public {
        if (!_to.send(_amount)) {
            revert(" function send Err ");
        }
    }

    function call(address payable _to, uint _amount) public {
        (bool flg, ) = _to.call{value: _amount, gas: 1000000}("");
        if (!flg) {
            revert(" function call Err ");
        }
    }

    function withdraw1() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdraw2() public {
        address payable to = payable(msg.sender);
        (bool flg, ) = to.call{value: address(this).balance, gas: 1000000}("");
        if (!flg) {
            revert(" function withdraw2 Err ");
        }
    }
}

// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.28;

contract TimeSample {
    uint public startTime;

    // start
    function start() public {
        startTime = block.timestamp;
    }

    // number of minutes has elapsed
    function hasElapsed(uint _min) public view returns (bool) {
        if (startTime == 0) return false;
        return ((block.timestamp - startTime) / 1 minutes >= _min);
    }
}

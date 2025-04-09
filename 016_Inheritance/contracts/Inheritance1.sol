// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.28;

contract A {
    uint public a;

    function setData(uint _a) public {
        a = _a;
    }

    function getData() public virtual view returns (uint) {
        return a;
    }
}

contract B is A {
    function setData(uint _a, uint _add) public {
        a = _a + _add;
    }

    function getData() public override view returns (uint) {
        return a * 10;
    }
}

contract Main {
    A[] public arrayA;

    function setData() public {
        A verA = new A();
        B verB = new B();

        verA.setData(1);
        verB.setData(1, 2);

        arrayA.push(verA);
        arrayA.push(verB);
    }

    function getData() public view returns (uint, uint) {
        require(arrayA.length == 2, "length Err");

        return (arrayA[0].getData(), arrayA[1].getData());
    }
}

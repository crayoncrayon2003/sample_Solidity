//SPDX-License-Identifier: Apache-2.0
pragma solidity >= 0.8.28;

contract BasicSample{
    function TypeSample() public pure returns(uint) {
        uint a;
        a = 1;

        uint b = a;
        b = 2;

        return a;
    }

    function IFSample(uint _in) public pure returns(uint) {
        uint ret;

        if ( 0 == ( _in % 2 ) ){
            ret = 1;
        }else if( 0 == ( _in % 3 ) ){
            ret = 2;
        }else{
            ret = 3;
        }

        return ret;
    }

    function ForSample(uint _in) public pure returns(uint) {
        uint sum = 0;

        for(uint idx = 0 ; idx < _in ; idx++){
            sum += idx;
        }

        return sum;
    }

    function WhileSample(uint _in) public pure returns(uint) {
        uint idx = 0;
        uint sum = 0;

        while( idx < 10 ) {
            sum += _in;
            idx++;
        }
        return sum;
    }

    function DoWhileSample(uint _in) public pure returns(uint) {
        uint idx = 0;
        uint sum = 0;

        do{
            sum += _in;
            idx++;
        } while( idx < 10 );

        return sum;
    }

    function ArraySample1() public pure returns(uint) {
        /* constructor ok / method ok */
        uint8[5] memory ary1 = [1,2,3,4,5];
        uint sum = 0;

        for(uint idx = 0 ; idx < ary1.length ; idx++ ){
            sum += ary1[idx];
        }

        return sum;
    }

    /* constructor ok / method ng */
    uint[] ary2;
    function ArraySample2() public returns(uint){
        for(uint idx = 0 ; idx < 10 ; idx++ ){
            ary2.push(idx);
        }
        uint sum = 0;
        for(uint idx = 0 ; idx < ary2.length ; idx++ ){
            sum += ary2[idx];
        }
        return sum;
    }

    /* constructor ok / method ng */
    mapping(uint => string) public city;
    function MappingSample() public {
        city[0] = "nagoya";
        city[1] = "tsu";
    }

    struct person {
        uint id;
        string name;
    }
    function StructSample() public pure {
        person[10] memory persons;
        persons[0].id = 1;
        persons[0].name = "nagoya";

        persons[1].id = 2;
        persons[1].name = "tsu";

    }

}

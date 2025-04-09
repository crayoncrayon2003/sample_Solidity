const { expect } = require("chai");

describe("HelloWorld1 contract", function () {
    let HelloWorld1;
    let helloWorld1;
    let owner;

    beforeEach(async function () {
        // Get Contract Factory
        HelloWorld1 = await ethers.getContractFactory("HelloWorld1");
        // Set Owner ( first account )
        [owner] = await ethers.getSigners();

        // Deploy Contract
        helloWorld1 = await HelloWorld1.deploy();
    });

    it("should return 'Hellow World' when say() is called", async function () {
        // call say()
        const result = await helloWorld1.say();
        // check return value
        expect(result).to.equal("Hellow World");
    });
});

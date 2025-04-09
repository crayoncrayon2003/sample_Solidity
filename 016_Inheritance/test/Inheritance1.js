const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Inheritance Test: Contracts A, B, and Main", function () {
    let ContractA, contractA;
    let ContractB, contractB;
    let ContractMain, contractMain;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        // Deploy Contract A
        ContractA = await ethers.getContractFactory("A");
        contractA = await ContractA.deploy();
        await contractA.waitForDeployment();

        // Deploy Contract B
        ContractB = await ethers.getContractFactory("B");
        contractB = await ContractB.deploy();
        await contractB.waitForDeployment();

        // Deploy Main Contract
        ContractMain = await ethers.getContractFactory("Main");
        contractMain = await ContractMain.deploy();
        await contractMain.waitForDeployment();
    });

    it("should correctly set and retrieve data in Contract A", async function () {
        await contractA.setData(5);
        const result = await contractA.getData();
        expect(result).to.equal(5);
    });

    it("should correctly set and retrieve data in Contract B", async function () {
        await contractB["setData(uint256,uint256)"](5, 3);
        const result = await contractB.getData();
        expect(result).to.equal(80); // (5 + 3) * 10 = 80
    });

    it("should correctly add instances of A and B in Main contract", async function () {
        await contractMain.setData(); // Add instances of A and B

        // Retrieve stored data
        const [dataA, dataB] = await contractMain.getData();

        expect(dataA).to.equal(1); // Contract A should return 1
        expect(dataB).to.equal(30); // Contract B should return (1 + 2) * 10 = 30
    });
});

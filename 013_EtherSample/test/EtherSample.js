const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EtherSample Contract", function () {
    let EtherSample, etherSample;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        // Deploy EtherSample
        EtherSample = await ethers.getContractFactory("EtherSample");
        etherSample = await EtherSample.deploy();
        await etherSample.waitForDeployment();
    });

    it("should return 0 wei and 0 ether for empty contract balance", async function () {
        const [weiValue, etherValue] = await etherSample.getEther();
        expect(weiValue).to.equal(0);
        expect(etherValue).to.equal(0);
    });

    it("should correctly calculate wei and ether from contract balance", async function () {
        // Send 1 ether to the contract
        const tx = await owner.sendTransaction({
            to: etherSample.target,
            value: ethers.parseEther("1") // 1 ether
        });
        await tx.wait();

        // Check values
        const [weiValue, etherValue] = await etherSample.getEther();
        expect(weiValue).to.equal(ethers.parseUnits("1", "ether")); // 1 ether in wei
        expect(etherValue).to.equal(1); // 1 ether
    });
});

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OneData Contract Test", function () {
    let ContractOneData, contractOneData;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        ContractOneData = await ethers.getContractFactory("OneData");
        contractOneData = await ContractOneData.deploy(ethers.encodeBytes32String("Genesis"));
        await contractOneData.waitForDeployment();
    });

    it("should correctly store and retrieve hash", async function () {
        const storedHash = await contractOneData.getHash();
        expect(storedHash).to.equal(ethers.encodeBytes32String("Genesis"));
    });

    it("should correctly add next and previous addresses", async function () {
        await contractOneData.setNext(addr1.address);
        await contractOneData.setPrev(addr2.address);

        expect(await contractOneData.next(0)).to.equal(addr1.address);
        expect(await contractOneData.prev(0)).to.equal(addr2.address);
    });

    it("should correctly verify if an address is included", async function () {
        const isIncluded = await contractOneData.isIncludeAddress(contractOneData.target);
        expect(isIncluded).to.equal(true);
    });

    it("should emit NotifyElement event when show() is called", async function () {
        await expect(contractOneData.show()).to.emit(contractOneData, "NotifyElement").withArgs(contractOneData.target, await contractOneData.getHash());
    });
});

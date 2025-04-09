const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Inheritance23_Owned & Inheritance23_Mortal Contract Test", function () {
    let ContractOwned, contractOwned;
    let ContractMortal, contractMortal;
    let owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        // Deploy Inheritance23_Owned contract
        ContractOwned = await ethers.getContractFactory("Inheritance23_Owned");
        contractOwned = await ContractOwned.deploy("OwnerName");
        await contractOwned.waitForDeployment();

        // Deploy Inheritance23_Mortal contract
        ContractMortal = await ethers.getContractFactory("Inheritance23_Mortal");
        contractMortal = await ContractMortal.deploy("OwnerName");
        await contractMortal.waitForDeployment();
    });

    it("should set the correct owner name and address in Owned contract", async function () {
        const storedOwnerName = await contractOwned.ownerName();
        const storedOwnerAddr = await contractOwned.ownerAddr();

        expect(storedOwnerName).to.equal("OwnerName"); // Verify stored owner name
        expect(storedOwnerAddr).to.equal(owner.address); // Verify stored owner address
    });

    it("should set the correct owner name and address in Mortal contract", async function () {
        const storedOwnerName = await contractMortal.ownerName();
        const storedOwnerAddr = await contractMortal.ownerAddr();

        expect(storedOwnerName).to.equal("OwnerName");
        expect(storedOwnerAddr).to.equal(owner.address);
    });

    it("should allow the owner to withdraw funds via destroy in Mortal contract", async function () {
        // Send 1 ether to Mortal contract
        await owner.sendTransaction({ to: contractMortal.target, value: ethers.parseEther("1") });

        // Verify contract balance before withdrawal
        const contractBalance = await ethers.provider.getBalance(contractMortal.target);
        expect(contractBalance).to.equal(ethers.parseEther("1"));

        // Execute destroy function (withdraw funds)
        const initialBalance = await ethers.provider.getBalance(owner.address);
        const tx = await contractMortal.destroy();
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed * receipt.gasPrice;

        // Verify contract balance and owner's balance after withdrawal
        const finalBalance = await ethers.provider.getBalance(owner.address);
        expect(await ethers.provider.getBalance(contractMortal.target)).to.equal(0);
        expect(finalBalance).to.be.closeTo(initialBalance + ethers.parseEther("1") - gasUsed, ethers.parseUnits("0.01", "ether"));
    });

    it("should revert if non-owner tries to withdraw funds via destroy", async function () {
        await expect(contractMortal.connect(addr1).destroy()).to.be.revertedWith("owner err");
    });

    it("should revert if contract has no funds to withdraw via destroy", async function () {
        await expect(contractMortal.destroy()).to.be.revertedWith("No funds to withdraw");
    });
});

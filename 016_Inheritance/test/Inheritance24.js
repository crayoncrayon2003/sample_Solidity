const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Inheritance24_Owned, Inheritance24_Mortal & Inheritance24_Faucet Contract Test", function () {
    let ContractOwned, contractOwned;
    let ContractMortal, contractMortal;
    let ContractFaucet, contractFaucet;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy Inheritance24_Owned contract
        ContractOwned = await ethers.getContractFactory("Inheritance24_Owned");
        contractOwned = await ContractOwned.deploy("OwnerName");
        await contractOwned.waitForDeployment();

        // Deploy Inheritance24_Mortal contract
        ContractMortal = await ethers.getContractFactory("Inheritance24_Mortal");
        contractMortal = await ContractMortal.deploy("OwnerName");
        await contractMortal.waitForDeployment();

        // Deploy Inheritance24_Faucet contract
        ContractFaucet = await ethers.getContractFactory("Inheritance24_Faucet");
        contractFaucet = await ContractFaucet.deploy("OwnerName");
        await contractFaucet.waitForDeployment();
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

        expect(storedOwnerName).to.equal("OwnerName"); // Verify stored owner name
        expect(storedOwnerAddr).to.equal(owner.address); // Verify stored owner address
    });

    it("should allow the owner to withdraw funds in Mortal contract", async function () {
        // Send 1 ether to Mortal contract
        await owner.sendTransaction({ to: contractMortal.target, value: ethers.parseEther("1") });

        // Verify contract balance before withdrawal
        const contractBalance = await ethers.provider.getBalance(contractMortal.target);
        expect(contractBalance).to.equal(ethers.parseEther("1"));

        // Execute withdrawal
        const initialBalance = await ethers.provider.getBalance(owner.address);
        const tx = await contractMortal.withdrawFunds();
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed * receipt.gasPrice;

        // Verify contract balance and owner's balance after withdrawal
        const finalBalance = await ethers.provider.getBalance(owner.address);
        expect(await ethers.provider.getBalance(contractMortal.target)).to.equal(0);
        expect(finalBalance).to.be.closeTo(initialBalance + ethers.parseEther("1") - gasUsed, ethers.parseUnits("0.01", "ether"));
    });

    it("should revert if non-owner tries to withdraw funds in Mortal contract", async function () {
        await expect(contractMortal.connect(addr1).withdrawFunds()).to.be.revertedWith("owner err");
    });

    it("should revert if contract has no funds to withdraw in Mortal contract", async function () {
        await expect(contractMortal.withdrawFunds()).to.be.revertedWith("No funds to withdraw");
    });

    it("should allow users to deposit Ether in Faucet contract", async function () {
        const depositAmount = ethers.parseEther("0.5");

        // Send 0.5 ether to Faucet contract
        const tx = await addr1.sendTransaction({ to: contractFaucet.target, value: depositAmount });
        await tx.wait();

        // Verify contract balance after deposit
        const contractBalance = await ethers.provider.getBalance(contractFaucet.target);
        expect(contractBalance).to.equal(depositAmount);
    });

    it("should allow users to withdraw Ether from Faucet contract within the limit", async function () {
        // Send 0.5 ether to Faucet contract for testing
        await owner.sendTransaction({ to: contractFaucet.target, value: ethers.parseEther("0.5") });

        // Execute withdrawal from Faucet contract
        const initialBalance = await ethers.provider.getBalance(addr2.address);
        const tx = await contractFaucet.connect(addr2).withdraw(ethers.parseEther("0.1"));
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed * receipt.gasPrice;

        // Verify final balance after withdrawal
        const finalBalance = await ethers.provider.getBalance(addr2.address);
        expect(finalBalance).to.be.closeTo(initialBalance + ethers.parseEther("0.1") - gasUsed, ethers.parseUnits("0.01", "ether"));
    });

    it("should revert withdrawal if amount exceeds Faucet limit", async function () {
        await expect(contractFaucet.withdraw(ethers.parseEther("0.2"))).to.be.revertedWith("withdrawAmount err");
    });

    it("should revert withdrawal if Faucet contract has insufficient balance", async function () {
        await expect(contractFaucet.withdraw(ethers.parseEther("0.1"))).to.be.revertedWith("Insufficient balance in faucet for withdrawal request");
    });
});

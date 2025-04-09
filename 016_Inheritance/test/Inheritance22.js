const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Inheritance22_Owned Contract Test", function () {
    let ContractOwned, contractOwned;
    let owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        // Deploy Inheritance22_Owned contract
        ContractOwned = await ethers.getContractFactory("Inheritance22_Owned");
        contractOwned = await ContractOwned.deploy("OwnerName");
        await contractOwned.waitForDeployment();
    });

    it("should set the correct owner name and address", async function () {
        const storedOwnerName = await contractOwned.ownerName();
        const storedOwnerAddr = await contractOwned.ownerAddr();

        expect(storedOwnerName).to.equal("OwnerName"); // Verify stored owner name
        expect(storedOwnerAddr).to.equal(owner.address); // Verify stored owner address
    });

    it("should allow the owner to withdraw funds", async function () {
        // Send 1 ether to contract
        await owner.sendTransaction({ to: contractOwned.target, value: ethers.parseEther("1") });

        // Verify contract balance before withdrawal
        const contractBalance = await ethers.provider.getBalance(contractOwned.target);
        expect(contractBalance).to.equal(ethers.parseEther("1"));

        // Execute withdrawal
        const initialBalance = await ethers.provider.getBalance(owner.address);
        const tx = await contractOwned.withdrawFunds();
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed * receipt.gasPrice;

        // Verify contract balance and owner's balance after withdrawal
        const finalBalance = await ethers.provider.getBalance(owner.address);
        expect(await ethers.provider.getBalance(contractOwned.target)).to.equal(0);
        expect(finalBalance).to.be.closeTo(initialBalance + ethers.parseEther("1") - gasUsed, ethers.parseUnits("0.01", "ether"));
    });

    it("should revert if non-owner tries to withdraw funds", async function () {
        await expect(contractOwned.connect(addr1).withdrawFunds()).to.be.revertedWith("owner err");
    });

    it("should revert if contract has no funds to withdraw", async function () {
        await expect(contractOwned.withdrawFunds()).to.be.revertedWith("No funds to withdraw");
    });
});

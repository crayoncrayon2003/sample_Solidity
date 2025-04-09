const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PayableSample2 Contract", function () {
    let PayableSample2, payableSample2;
    let owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        // Deploy PayableSample2 contract
        PayableSample2 = await ethers.getContractFactory("PayableSample2");
        payableSample2 = await PayableSample2.deploy();
        await payableSample2.waitForDeployment();
    });

    it("should accept ether through direct transfer", async function () {
        await owner.sendTransaction({ to: payableSample2.target, value: ethers.parseEther("1") });
        const balance = await ethers.provider.getBalance(payableSample2.target);
        expect(balance).to.equal(ethers.parseEther("1"));
    });

    it("should return the correct balance", async function () {
        await owner.sendTransaction({ to: payableSample2.target, value: ethers.parseEther("1") });
        const contractBalance = await payableSample2.getBalance();
        expect(contractBalance).to.equal(ethers.parseEther("1"));
    });

    it("should transfer all contract balance to msg.sender", async function () {
        // Send Ether to contract
        await owner.sendTransaction({ to: payableSample2.target, value: ethers.parseEther("1") });

        // Check initial balance of owner
        const initialBalance = await ethers.provider.getBalance(owner.address);

        // Execute transfer function
        const tx = await payableSample2.transfer();
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed * receipt.gasPrice;

        // Check final balance of owner
        const finalBalance = await ethers.provider.getBalance(owner.address);

        // Validate contract balance is emptied and owner receives funds
        expect(await ethers.provider.getBalance(payableSample2.target)).to.equal(0);
        expect(finalBalance).to.be.closeTo(
            initialBalance + ethers.parseEther("1") - gasUsed, 
            ethers.parseUnits("0.01", "ether") // Allow small margin due to gas cost
        );
    });
});

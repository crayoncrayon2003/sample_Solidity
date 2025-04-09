const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PayableSample3 Contract", function () {
    let PayableSample3, payableSample3;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy PayableSample3 contract
        PayableSample3 = await ethers.getContractFactory("PayableSample3");
        payableSample3 = await PayableSample3.deploy();
        await payableSample3.waitForDeployment();
    });

    it("should return the correct balance of a target address", async function () {
        await owner.sendTransaction({ to: payableSample3.target, value: ethers.parseEther("1") });
        const contractBalance = await payableSample3.getBalance(payableSample3.target);
        expect(contractBalance).to.equal(ethers.parseEther("1"));
    });

    it("should transfer Ether correctly", async function () {
        await owner.sendTransaction({ to: payableSample3.target, value: ethers.parseEther("1") });

        // Execute transfer
        await payableSample3.transfer(addr1.address, ethers.parseEther("1"));

        // Validate transfer
        const balance = await ethers.provider.getBalance(addr1.address);
        expect(balance).to.be.gt(ethers.parseEther("1")); // Ensure addr1 received funds
    });

    it("should send Ether correctly", async function () {
        await owner.sendTransaction({ to: payableSample3.target, value: ethers.parseEther("1") });

        // Execute send
        await payableSample3.send(addr1.address, ethers.parseEther("1"));

        // Validate send
        const balance = await ethers.provider.getBalance(addr1.address);
        expect(balance).to.be.gt(ethers.parseEther("1")); // Ensure addr1 received funds
    });

    it("should call a payable address correctly", async function () {
        await owner.sendTransaction({ to: payableSample3.target, value: ethers.parseEther("1") });

        // Execute call function
        await payableSample3.call(addr1.address, ethers.parseEther("1"));

        // Validate call
        const balance = await ethers.provider.getBalance(addr1.address);
        expect(balance).to.be.gt(ethers.parseEther("1")); // Ensure addr1 received funds
    });

    it("should withdraw balance to msg.sender using withdraw1", async function () {
        await owner.sendTransaction({ to: payableSample3.target, value: ethers.parseEther("1") });

        // Get initial balance of the owner
        const initialBalance = await ethers.provider.getBalance(owner.address);

        // Execute withdraw function
        const tx = await payableSample3.withdraw1();
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed * receipt.gasPrice;

        // Get final balance of the owner
        const finalBalance = await ethers.provider.getBalance(owner.address);

        // Validate withdrawal
        expect(await ethers.provider.getBalance(payableSample3.target)).to.equal(0);
        expect(finalBalance).to.be.closeTo(initialBalance + BigInt(ethers.parseEther("1")) - gasUsed, ethers.parseUnits("0.01", "ether"));
    });

    it("should withdraw balance to msg.sender using withdraw2", async function () {
        await owner.sendTransaction({ to: payableSample3.target, value: ethers.parseEther("1") });

        // Get initial balance of the owner
        const initialBalance = await ethers.provider.getBalance(owner.address);

        // Execute withdraw function
        const tx = await payableSample3.withdraw2();
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed * receipt.gasPrice;

        // Get final balance of the owner
        const finalBalance = await ethers.provider.getBalance(owner.address);

        // Validate withdrawal
        expect(await ethers.provider.getBalance(payableSample3.target)).to.equal(0);
        expect(finalBalance).to.be.closeTo(initialBalance + BigInt(ethers.parseEther("1")) - gasUsed, ethers.parseUnits("0.01", "ether"));
    });
});

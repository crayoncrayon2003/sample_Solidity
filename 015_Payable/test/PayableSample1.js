const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PayableSample Contracts", function () {
    let PayableSample11, payableSample11;
    let PayableSample12, payableSample12;
    let PayableSample13, payableSample13;
    let owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        // Deploy PayableSample11
        PayableSample11 = await ethers.getContractFactory("PayableSample11");
        payableSample11 = await PayableSample11.deploy();
        await payableSample11.waitForDeployment();

        // Deploy PayableSample12
        PayableSample12 = await ethers.getContractFactory("PayableSample12");
        payableSample12 = await PayableSample12.deploy();
        await payableSample12.waitForDeployment();

        // Deploy PayableSample13
        PayableSample13 = await ethers.getContractFactory("PayableSample13");
        payableSample13 = await PayableSample13.deploy();
        await payableSample13.waitForDeployment();
    });

    it("should accept ether via pay1() in PayableSample11", async function () {
        await owner.sendTransaction({ to: payableSample11.target, value: ethers.parseEther("1") });
        const balance = await ethers.provider.getBalance(payableSample11.target);
        expect(balance).to.equal(ethers.parseEther("1"));
    });

    it("should accept ether via pay2() in PayableSample11", async function () {
        await payableSample11.pay2({ value: ethers.parseEther("1") });
        const balance = await ethers.provider.getBalance(payableSample11.target);
        expect(balance).to.equal(ethers.parseEther("1"));
    });

    it("should accept ether via fallback function in PayableSample12", async function () {
        await owner.sendTransaction({ to: payableSample12.target, value: ethers.parseEther("1") });
        const balance = await ethers.provider.getBalance(payableSample12.target);
        expect(balance).to.equal(ethers.parseEther("1"));
    });

    it("should accept ether via receive function in PayableSample13", async function () {
        await owner.sendTransaction({ to: payableSample13.target, value: ethers.parseEther("1") });
        const balance = await ethers.provider.getBalance(payableSample13.target);
        expect(balance).to.equal(ethers.parseEther("1"));
    });
});

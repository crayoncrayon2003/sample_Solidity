const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AdressSample Contracts", function () {
    let AdressSample11, adressSample11;
    let AdressSample12, adressSample12;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        // Deploy AdressSample11
        AdressSample11 = await ethers.getContractFactory("AdressSample11");
        adressSample11 = await AdressSample11.deploy();
        await adressSample11.waitForDeployment();

        // Deploy AdressSample12 using the deployed AdressSample11 address
        AdressSample12 = await ethers.getContractFactory("AdressSample12");
        adressSample12 = await AdressSample12.deploy(adressSample11.target); // Pass correct instance
        await adressSample12.waitForDeployment();
    });

    it("should return its own address from getThisAddress() in AdressSample11", async function () {
        const contractAddress = await adressSample11.getThisAddress();
        expect(contractAddress).to.equal(adressSample11.target); // Fix: Use `.target` instead of `.address`
    });

    it("should return msg.sender address from getMsgAddress() in AdressSample11", async function () {
        const msgSenderAddress = await adressSample11.getMsgAddress();
        expect(msgSenderAddress).to.equal(owner.address);
    });

    it("should return AdressSample11's address from getThisAddress() in AdressSample12", async function () {
        const contractAddress = await adressSample12.getThisAddress();
        expect(contractAddress).to.equal(adressSample11.target); // Fix: Calls getThisAddress() inside AdressSample11
    });

    it("should return AdressSample12's address from getMsgAddress() in AdressSample12", async function () {
        const msgSenderAddress = await adressSample12.getMsgAddress();
        expect(msgSenderAddress).to.equal(adressSample12.target); // Fix: Calls getMsgAddress() inside AdressSample11
    });
});

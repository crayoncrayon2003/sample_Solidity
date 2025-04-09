const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AdressSample2 Contract", function () {
    let AdressSample2, adressSample2;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        AdressSample2 = await ethers.getContractFactory("AdressSample2");
        adressSample2 = await AdressSample2.deploy();
        await adressSample2.waitForDeployment();
    });

    it("should allow setting and getting values for a specific address", async function () {
        await adressSample2.setValue_To(addr1.address, 100);
        const value = await adressSample2.getValue_To(addr1.address);
        expect(value).to.equal(100);
    });

    it("should allow setting and getting values for msg.sender", async function () {
        await adressSample2.setValue_MsgSender(200);
        const value = await adressSample2.getValue_MsgSender();
        expect(value).to.equal(200);
    });

    it("should allow setting and getting values for the contract itself", async function () {
        await adressSample2.setValue_This(300);
        const value = await adressSample2.getValue_This();
        expect(value).to.equal(300);
    });

    it("should correctly determine if an address is a member", async function () {
        await adressSample2.setValue_To(addr2.address, 50);
        const isMemberBefore = await adressSample2.isMember(owner.address);
        const isMemberAfter = await adressSample2.isMember(addr2.address);

        expect(isMemberBefore).to.be.false; // Owner hasn't been set
        expect(isMemberAfter).to.be.true; // Addr2 has been assigned a value
    });
});

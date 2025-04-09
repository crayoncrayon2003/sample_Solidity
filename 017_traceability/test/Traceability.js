const { expect, anyValue } = require("chai");
const { ethers } = require("hardhat");

describe("Traceability Contract Test", function () {
    let ContractTraceability, contractTraceability;
    let ContractTraceData, contractTraceData;
    let ContractOneData, contractOneData;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy Traceability contract
        ContractTraceability = await ethers.getContractFactory("Traceability");
        contractTraceability = await ContractTraceability.deploy();
        await contractTraceability.waitForDeployment();

        // Deploy TraceData contract
        ContractTraceData = await ethers.getContractFactory("TraceData");
        contractTraceData = await ContractTraceData.deploy();
        await contractTraceData.waitForDeployment();

        // Deploy OneData contract
        ContractOneData = await ethers.getContractFactory("OneData");
        contractOneData = await ContractOneData.deploy(ethers.encodeBytes32String("Genesis"));
        await contractOneData.waitForDeployment();
    });

    it("should revert if an invalid trace number is provided", async function () {
        const invalidTraceNo = 999;
        const storeAddr = [contractOneData.target];
        const nowData = ["Invalid Data"];
        const time = "2025-04-09";

        await expect(
            contractTraceability.add(invalidTraceNo, storeAddr, nowData, time)
        ).to.be.revertedWith("Invalid trace number");
    });

    it("should emit NotifyElement event when show() is called", async function () {
        await contractTraceability.create();
        await expect(contractTraceability.show(0)).to.emit(contractTraceability, "NotifyElement");
    });
});

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TimeSample Contract", function () {
    let TimeSample, timeSample;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        // Deploy TimeSample contract
        TimeSample = await ethers.getContractFactory("TimeSample");
        timeSample = await TimeSample.deploy();
        await timeSample.waitForDeployment();
    });

    it("should initialize startTime correctly", async function () {
        await timeSample.start();
        const startTime = await timeSample.startTime();
        expect(startTime).to.be.gt(0); // Ensure startTime is greater than zero
    });

    it("should return false if startTime is not initialized", async function () {
        const result = await timeSample.hasElapsed(5);
        expect(result).to.be.false; // Returns false if startTime has not been set
    });

    it("should return true after the specified minutes have elapsed", async function () {
        await timeSample.start();

        // Get the current block.timestamp
        const initialTimestamp = (await ethers.provider.getBlock("latest")).timestamp;
        console.log("Initial Timestamp:", initialTimestamp);

        // Increase time by 5 minutes (300 seconds)
        await network.provider.send("evm_increaseTime", [5 * 60]);
        await network.provider.send("evm_mine"); // Create a new block

        // Get the updated block.timestamp
        const newTimestamp = (await ethers.provider.getBlock("latest")).timestamp;
        console.log("New Timestamp:", newTimestamp);

        const result = await timeSample.hasElapsed(5);
        expect(result).to.be.true; // Should return true once 5 minutes have passed
    });
});

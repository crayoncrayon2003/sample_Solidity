const { expect } = require("chai");

describe("BasicSample contract", function () {
    let BasicSample;
    let basicSample;
    let owner;

    beforeEach(async function () {
        // Get Contract Factory
        BasicSample = await ethers.getContractFactory("BasicSample");
        // Set Owner ( first account )
        [owner] = await ethers.getSigners();

        // Deploy Contract
        basicSample = await BasicSample.deploy();
    });

    it("should return 1 when TypeSample() is called", async function () {
        // call TypeSample()
        const result = await basicSample.TypeSample();
        // check return value
        expect(result).to.equal(1);
    });

    it("should return 1 when IFSample() is called with input 4", async function () {
        // call IFSample with input 4
        const result = await basicSample.IFSample(4);
        // check return value
        expect(result).to.equal(1);
    });

    it("should return 10 when ForSample() is called with input 5", async function () {
        // call ForSample with input 5
        const result = await basicSample.ForSample(5);
        // check return value
        expect(result).to.equal(10); // sum of numbers from 0 to 4
    });

    it("should return 30 when WhileSample() is called with input 3", async function () {
        // call WhileSample with input 3
        const result = await basicSample.WhileSample(3);
        // check return value
        expect(result).to.equal(30); // 3 * 10
    });

    it("should return 20 when DoWhileSample() is called with input 2", async function () {
        // call DoWhileSample with input 2
        const result = await basicSample.DoWhileSample(2);
        // check return value
        expect(result).to.equal(20); // 2 * 10
    });

    it("should return 15 when ArraySample1() is called", async function () {
        // call ArraySample1()
        const result = await basicSample.ArraySample1();
        // check return value
        expect(result).to.equal(15); // sum of 1+2+3+4+5
    });

    it("should return 45 when ArraySample2() is called", async function () {
        // Calls and executes
        await basicSample.ArraySample2();
        // Calls again to retrieve result
        const result = await basicSample.ArraySample2();
        expect(result).to.equal(45); // sum of 0+1+2+ ...+9
    });

    it("should execute MappingSample() successfully", async function () {
        // call MappingSample()
        await basicSample.MappingSample();
        // No return value, so we check if the function executes without errors
        expect(true).to.be.true; // Just a placeholder assertion to verify execution
    });

    it("should execute StructSample() successfully", async function () {
        // call StructSample()
        await basicSample.StructSample();
        // No return value, so we check if the function executes without errors
        expect(true).to.be.true; // Just a placeholder assertion to verify execution
    });
});

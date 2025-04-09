const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TraceabilityDeployment", (m) => {
  // Deploy OneData contract with initial hash
  const oneData = m.contract("OneData", [ethers.encodeBytes32String("Genesis")]);

  // Deploy TraceData contract
  const traceData = m.contract("TraceData");

  // Deploy Traceability contract
  const traceability = m.contract("Traceability");

  return { oneData, traceData, traceability };
});

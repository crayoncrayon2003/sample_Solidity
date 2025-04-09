const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TimeSample", (m) => {
  const hello = m.contract("TimeSample");
  return { hello };
});
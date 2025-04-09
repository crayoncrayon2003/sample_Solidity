const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BasicSample", (m) => {
  const hello = m.contract("BasicSample");
  return { hello };
});
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EtherSample", (m) => {
  const hello = m.contract("EtherSample");
  return { hello };
});
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HelloWorld1", (m) => {
  const hello = m.contract("HelloWorld1");
  return { hello };
});
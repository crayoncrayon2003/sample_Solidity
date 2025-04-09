const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HelloWorld2Module", (m) => {
  const greeting = "Hello Hardhat!";
  const hello = m.contract("HelloWorld2", [greeting]);
  return { hello };
});

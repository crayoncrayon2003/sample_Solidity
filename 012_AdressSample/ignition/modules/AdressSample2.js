const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AdressSampleModule", (m) => {
  const adressSample2 = m.contract("AdressSample2");

  return { adressSample2 };
});

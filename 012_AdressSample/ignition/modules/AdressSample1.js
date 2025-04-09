const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AdressSampleModule", (m) => {
  const adressSample11 = m.contract("AdressSample11");
   // Pass the deployed AdressSample11 as a constructor argument if needed
  const adressSample12 = m.contract("AdressSample12", [adressSample11]);
  return { adressSample11, adressSample12 };
});
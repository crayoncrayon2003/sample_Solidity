const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PayableSample", (m) => {
  const payableSample11 = m.contract("PayableSample11");
  const payableSample12 = m.contract("PayableSample12");
  const payableSample31 = m.contract("PayableSample13");
  const payableSample2 = m.contract("PayableSample2");
  const payableSample3 = m.contract("PayableSample3");

  return { payableSample11, payableSample12, payableSample31, payableSample2, payableSample3 };
});

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Inheritance", (m) => {
  const owned_name21 = "Inheritance21_Owned";
  const owned_name22 = "Inheritance22_Owned";
  const owned_name23 = "Inheritance23_Owned";
  const mortal_name23 = "Inheritance23_Mortal";
  const owned_name24 = "Inheritance24_Owned";
  const mortal_name24 = "Inheritance24_Mortal";
  const faucet_name24 = "Inheritance24_Faucet";

  const A = m.contract("A");
  const B = m.contract("B");
  const main = m.contract("main");
  const Inheritance21_Owned = m.contract("Inheritance21_Owned",  [owned_name21]);
  const Inheritance22_Owned = m.contract("Inheritance22_Owned",  [owned_name22]);
  const Inheritance23_Owned = m.contract("Inheritance23_Owned",  [owned_name23]);
  const Inheritance23_Mortal = m.contract("Inheritance23_Mortal",[mortal_name23]);
  const Inheritance24_Owned = m.contract("Inheritance24_Owned",  [owned_name24]);
  const Inheritance24_Mortal = m.contract("Inheritance24_Mortal",[mortal_name24]);
  const Inheritance24_Faucet = m.contract("Inheritance24_Faucet",[faucet_name24]);



  return {
    A, B, main,
    Inheritance21_Owned, Inheritance22_Owned,
    Inheritance23_Owned, Inheritance23_Mortal,
    Inheritance24_Owned, Inheritance24_Mortal, Inheritance24_Faucet
  };
});

const { expect } = require("chai");

describe("HelloWorld2 contract", function () {
  let HelloWorld2;
  let helloWorld2;
  let owner;

  beforeEach(async function () {
    // コントラクトのファクトリを取得し、デプロイ
    HelloWorld2 = await ethers.getContractFactory("HelloWorld2");
    [owner] = await ethers.getSigners();  // 最初のアカウントをオーナーとして設定

    const greeting = "Hello Hardhat!";
    helloWorld2 = await HelloWorld2.deploy(greeting);  // コンストラクタ引数で初期値を渡す
  });

  it("should set greeting correctly via constructor", async function () {
    // コンストラクタで設定した初期の greeting を確認
    const greeting = await helloWorld2.getWord();
    expect(greeting).to.equal("Hello Hardhat!");
  });

  it("should update greeting via setWord", async function () {
    // setWord メソッドで greeting を更新
    await helloWorld2.setWord("Hello Ethereum!");
    const updatedGreeting = await helloWorld2.getWord();
    expect(updatedGreeting).to.equal("Hello Ethereum!");
  });

  it("should return updated greeting after setWord", async function () {
    // setWord メソッドで新しい greeting を設定し、その後 getWord メソッドで確認
    await helloWorld2.setWord("Updated Greeting");
    const result = await helloWorld2.getWord();
    expect(result).to.equal("Updated Greeting");
  });
});

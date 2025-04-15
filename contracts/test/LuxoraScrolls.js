const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LuxoraScrolls", function () {
  it("Should deploy with the correct name and symbol", async function () {
    const [owner] = await ethers.getSigners();

    const LuxoraScrolls = await ethers.getContractFactory("LuxoraScrolls");

    const hardhatLuxoraScrolls = await LuxoraScrolls.deploy("LuxoraScrolls", "LXS");

    await hardhatLuxoraScrolls.deployed();
    
    expect(await hardhatLuxoraScrolls.name()).to.equal("LuxoraScrolls");
    expect(await hardhatLuxoraScrolls.symbol()).to.equal("LXS");
  });
});

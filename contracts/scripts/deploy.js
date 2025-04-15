const hre = require("hardhat");

async function main() {
  const LuxoraScrolls = await hre.ethers.getContractFactory("LuxoraScrolls");
  const luxoraScrolls = await LuxoraScrolls.deploy("LuxoraScrolls", "LXS");

  await luxoraScrolls.deployed();

  console.log(
    `LuxoraScrolls deployed to ${luxoraScrolls.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

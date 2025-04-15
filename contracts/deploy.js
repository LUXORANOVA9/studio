const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const LuxoraScrolls = await hre.ethers.getContractFactory("LuxoraScrolls");
  // Replace with your IPFS base URI
  const baseURI = process.env.IPFS_BASE_URI || "ipfs://YOUR_IPFS_CID/";
  const superAdminAddress = process.env.SUPER_ADMIN_ADDRESS;

  if (!superAdminAddress) {
    console.error("SUPER_ADMIN_ADDRESS not set in environment variables.");
    return;
  }

  const luxoraScrolls = await LuxoraScrolls.deploy("LuxoraScrolls", "LXS", baseURI);

  await luxoraScrolls.deployed();

  console.log(
    `LuxoraScrolls deployed to ${luxoraScrolls.address}`
  );

  // Set the SuperAdmin address after deployment
  await luxoraScrolls.setSuperAdmin(superAdminAddress);
  console.log(`SuperAdmin set to: ${superAdminAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

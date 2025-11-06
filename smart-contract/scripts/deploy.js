require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying contracts with:", deployer.address);

  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  console.log("💰 MockUSDC deployed to:", await usdc.getAddress());

  const I0rdCore = await ethers.getContractFactory("I0rdCore");
  const core = await I0rdCore.deploy(await usdc.getAddress());
  await core.waitForDeployment();
  console.log("⚙️ I0rdCore deployed to:", await core.getAddress());

  // 3️⃣ Mint USDC to deployer for testing (if MockUSDC supports it)
  await usdc.mint(deployer.address, ethers.parseUnits("10000", 6));
  console.log("✅ Minted 10,000 USDC to deployer");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

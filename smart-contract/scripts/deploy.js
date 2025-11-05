// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // 1. Deploy MockUSDC
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  console.log("MockUSDC deployed to:", await usdc.getAddress());

  // 2. Deploy I0rdCore
  const I0rdCore = await ethers.getContractFactory("I0rdCore");
  const core = await I0rdCore.deploy(await usdc.getAddress());
  await core.waitForDeployment();
  console.log("I0rdCore deployed to:", await core.getAddress());

  // Optional: mint some USDC to deployer for testing
  await usdc.mint(deployer.address, ethers.parseUnits("10000", 6));
  console.log("Minted 10,000 USDC to deployer");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
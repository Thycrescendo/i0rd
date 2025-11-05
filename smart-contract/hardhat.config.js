require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.RPC_URL;

if (!privateKey) {
  console.warn("Please set your PRIVATE_KEY in the .env file");
}
if (!rpcUrl) {
  console.warn("Please set your RPC_URL in the .env file");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      // Configuration for the local Hardhat Network
    },
    og_testnet_v3: {
      url: rpcUrl || "", // Fallback to empty string if not set
      accounts: privateKey ? [`0x${privateKey}`] : [], // Add 0x prefix
      chainId: 16601, // Updated Chain ID for 0G Testnet V3
    },
  },
  // Optional: Specify etherscan API key if verification is needed later
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY
  // }
};

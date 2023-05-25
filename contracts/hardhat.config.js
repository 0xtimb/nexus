require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const {
  GOERLI_API_URL,
  BSC_API_URL,
  PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  BSCSCAN_API_KEY,
  NEXUS_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} = process.env;

task("etherscan-verify", "Verifies on etherscan", async (taskArgs, hre) => {
  console.log("Verifying contract on etherscan...");
  await hre.run("verify:verify", {
    address: NEXUS_CONTRACT_ADDRESS,
    network: taskArgs["network"],
  });
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "bscTestnet",
  networks: {
    goerli: {
      url: GOERLI_API_URL ?? "",
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 100000000000,
    },
    bscTestnet: {
      url: BSC_API_URL ?? "",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSCSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
    },
  },
};

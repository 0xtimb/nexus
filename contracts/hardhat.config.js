require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const {
  GOERLI_API_URL,
  THETA_API_URL_URL,
  PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  EXPLORER_API_URL_API_KEY,
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
// module.exports = {
//   solidity: "0.8.17",
//   defaultNetwork: "thetaTestnet",
//   networks: {
//     goerli: {
//       url: GOERLI_API_URL ?? "",
//       accounts: [`0x${PRIVATE_KEY}`],
//       gasPrice: 100000000000,
//     },
//     thetaTestnet: {
//       url: THETA_API_URL_URL ?? "",
//       accounts: [`0x${PRIVATE_KEY}`],
//     },
//   },
//   etherscan: {
//     apiKey: {
//       thetaTestnet: EXPLORER_API_URL_API_KEY,
//       goerli: ETHERSCAN_API_KEY,
//     },
//   },
// };

// require("@nomiclabs/hardhat-waffle");
// require("dotenv").config();

module.exports = {
  defaultNetwork: "theta_testnet",
  networks: {
    theta_privatenet: {
      url: "http://localhost:18888/rpc",
      accounts: [
        "1111111111111111111111111111111111111111111111111111111111111111",
        "2222222222222222222222222222222222222222222222222222222222222222",
        "3333333333333333333333333333333333333333333333333333333333333333",
      ],
      chainId: 366,
      gasPrice: 4000000000000,
    },
    theta_testnet: {
      url: `https://eth-rpc-api-testnet.thetatoken.org/rpc`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 365,
      gasPrice: 4000000000000,
    },
    theta_mainnet: {
      url: `https://eth-rpc-api.thetatoken.org/rpc`,
      accounts: [
        "1111111111111111111111111111111111111111111111111111111111111111",
      ],
      chainId: 361,
      gasPrice: 4000000000000,
    },
  },
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  mocha: {
    enableTimeouts: false,
    before_timeout: 480000,
  },
};

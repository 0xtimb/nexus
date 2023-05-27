require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const { NEXUS_CONTRACT_ADDRESS } = process.env;

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
    version: "0.8.1",
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

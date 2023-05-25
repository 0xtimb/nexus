const hre = require("hardhat");

const collectionURI =
  "https://bafybeigtzh2ym6o4gvho6s3wwuxty53vfhxwzjrdjorpyy3vw3enpcqbeq.ipfs.w3s.link/nexus_collection.json";

async function main() {
  const NexusNFT = await hre.ethers.getContractFactory("NexusNFT");

  const nexusNFT = await NexusNFT.attach(
    process.env.NEXUS_COLLECTION_ADDRESS // deployed contract address
  );

  console.log("MyNFT attached to:", nexusNFT.address);

  console.log("Setting collection URI...");

  const res = await nexusNFT.setCollectionURI(collectionURI);

  console.log("Set!", res);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

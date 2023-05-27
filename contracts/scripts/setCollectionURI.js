const hre = require("hardhat");

// https://bafybeicicpkvrvrmz2r2vca7zqhdwl7lidtqpdplhbhwjlnxd3b3s2urva.ipfs.w3s.link/pokemon_collection.json
// https://bafybeigtzh2ym6o4gvho6s3wwuxty53vfhxwzjrdjorpyy3vw3enpcqbeq.ipfs.w3s.link/nexus_collection.json
// https://bafybeibbt7fqabdcrykzkyvlzzzbbkoyx7otmrhcddzj4kiseo322vhkxi.ipfs.w3s.link/collection.json
// https://bafybeicicpkvrvrmz2r2vca7zqhdwl7lidtqpdplhbhwjlnxd3b3s2urva.ipfs.w3s.link/pokemon_collection.json
// https://bafybeid76hfxrsh22d4ofp4o4qvwxntnvuxoh2akt4wgxvl7hyy6asyxie.ipfs.w3s.link/journey_collection.json
// https://bafybeia3jo6tskdrc2qq5jgkn5fxnpn3ep4zrhqgb7ux2nhurnehj3jkpy.ipfs.w3s.link/slenderman_collection.json

const collectionURI =
  "https://bafybeia3jo6tskdrc2qq5jgkn5fxnpn3ep4zrhqgb7ux2nhurnehj3jkpy.ipfs.w3s.link/slenderman_collection.json";

async function main() {
  const NexusNFT = await hre.ethers.getContractFactory("NexusNFT");

  const nexusNFT = await NexusNFT.attach(
    process.env.SLENDERMAN_CONTRACT_ADDRESS // deployed contract address
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

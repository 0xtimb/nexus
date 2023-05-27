require("dotenv").config();
const hre = require("hardhat");

const journeyURIs = [
  "https://bafybeibz2muftsdqar5oqzgcbyhd6eak7qignh4lmanefxx5r6zcjjct2e.ipfs.w3s.link/journey.json",
  "https://bafybeibz2muftsdqar5oqzgcbyhd6eak7qignh4lmanefxx5r6zcjjct2e.ipfs.w3s.link/journey.json",
  "https://bafybeibz2muftsdqar5oqzgcbyhd6eak7qignh4lmanefxx5r6zcjjct2e.ipfs.w3s.link/journey.json",
  "https://bafybeibz2muftsdqar5oqzgcbyhd6eak7qignh4lmanefxx5r6zcjjct2e.ipfs.w3s.link/journey.json",
  "https://bafybeibz2muftsdqar5oqzgcbyhd6eak7qignh4lmanefxx5r6zcjjct2e.ipfs.w3s.link/journey.json",
  "https://bafybeibz2muftsdqar5oqzgcbyhd6eak7qignh4lmanefxx5r6zcjjct2e.ipfs.w3s.link/journey.json",
];

const slendermanURIs = [
  "https://bafybeiggcwud3tyjl2yj5s3ijj2wnjpe3mmmcxglsy45gvg5a7opjyjtky.ipfs.w3s.link/slenderman.json",
  "https://bafybeiggcwud3tyjl2yj5s3ijj2wnjpe3mmmcxglsy45gvg5a7opjyjtky.ipfs.w3s.link/slenderman.json",
  "https://bafybeiggcwud3tyjl2yj5s3ijj2wnjpe3mmmcxglsy45gvg5a7opjyjtky.ipfs.w3s.link/slenderman.json",
  "https://bafybeiggcwud3tyjl2yj5s3ijj2wnjpe3mmmcxglsy45gvg5a7opjyjtky.ipfs.w3s.link/slenderman.json",
  "https://bafybeiggcwud3tyjl2yj5s3ijj2wnjpe3mmmcxglsy45gvg5a7opjyjtky.ipfs.w3s.link/slenderman.json",
  "https://bafybeiggcwud3tyjl2yj5s3ijj2wnjpe3mmmcxglsy45gvg5a7opjyjtky.ipfs.w3s.link/slenderman.json",
];

const pokemonURIs = [
  "https://bafybeige5msa2ew7qgrqtp3f667gvvsfz4z7a64ezk6v4vy2nnopqpxqeq.ipfs.w3s.link/1.json",
  "https://bafybeicumamfmebf254r66lzcjo5azj76gesogb7jff6hus2gjhjn3aux4.ipfs.w3s.link/2.json",
  "https://bafybeidnaskbwd237rh7kdw2jhuqxnb3zbt2jvllonfk6c6arm2j24hoae.ipfs.w3s.link/3.json",
  "https://bafybeide5qfugo56fkg2cjprz64v3eyzmgxptgez74ddnct6xmz2ulnliq.ipfs.w3s.link/4.json",
  "https://bafybeialgmilinko3l4teecn3faroktldt5kiuelcsscb46ay4yzwfbxxm.ipfs.w3s.link/5.json",
  "https://bafybeigosdsf2626uv5axqhwnm2b7fmgharcgsbq423aocrpzjnqnzx36q.ipfs.w3s.link/6.json",
];

const tokenURIs = [
  "https://bafybeid4ppp6fhjsjp35bnhrwmdjydrrfdtullcy2pmbzyunuthi4aiaoa.ipfs.w3s.link/1.json",
  "https://bafybeigv7yma2o2kzgcf3dlgwdkqzxrj23lqa7rqbkbxqnmle24plba5xa.ipfs.w3s.link/2.json",
  "https://bafybeicnl7y5qelnmaafvl4wvuunmxakotor4k33awdgn55qcw2wmcyufm.ipfs.w3s.link/3.json",
  "https://bafybeicskeoewqoxsk76tcn5ltjzxttldtmgr4sluoivdyjpfbkuswfnlq.ipfs.w3s.link/4.json",
  "https://bafybeibxozh3el3ovadendfm6dypdjhurlemrakv7y2eusddamvf444je4.ipfs.w3s.link/5.json",
  "https://bafybeid4lczpe3sfxn5udgxwgtcbbaksgyjvryigmd5v5i64eeo3uoqs4a.ipfs.w3s.link/6.json",
  "https://bafybeiercgm5izdbv2d7pqxl4wnz4fj6hsn6mycaqibom5uzyvbyo4rj3y.ipfs.w3s.link/7.json",
  "https://bafybeiafktdujc7bhrdmf25a76aef6yuvi3czc5peu4qyxnfi2kfdxveba.ipfs.w3s.link/8.json",
  "https://bafybeibdpsk3npjfwpbiroa4ckymw4bwraaozqeflduv34m2qehxp52eqe.ipfs.w3s.link/9.json",
  "https://bafybeifucystmc6bff3szztknxq2appmksihqhjbjqfnhvgnb3xbfzkojm.ipfs.w3s.link/10.json",
];

const NFT_CONTRACT_ADDRESS = process.env.SLENDERMAN_CONTRACT_ADDRESS ?? "";
const URIs = slendermanURIs;

const userAddress = "0x72f97e9Be4C6EB8f0eb2fD483945385A9a742C0b";

async function main() {
  const NexusNFT = await hre.ethers.getContractFactory("NexusNFT");

  const nexusNFT = await NexusNFT.attach(NFT_CONTRACT_ADDRESS);

  console.log("NexusNFT attached to:", nexusNFT.address);

  console.log("Minting...");
  try {
    for (let i = 0; i < URIs.length; i++) {
      const txn = await nexusNFT.mintWithTokenURI(userAddress, URIs[i]);
      await txn.wait();
      await new Promise((r) => setTimeout(r, 1000));
      console.log("minted tokenId: ", i);
    }
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }

  console.log("Minted!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

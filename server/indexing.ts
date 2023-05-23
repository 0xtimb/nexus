// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import fetch from "node-fetch";
import db from "./firebase";
import * as dotenv from "dotenv";

dotenv.config();

function getTimestamp() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date().toLocaleString("en-us");
}

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

async function main() {
  try {
    // await createAssets();
    await createListings();
  } catch (e) {
    console.log(e);
  }
}

async function createAssets() {
  try {
    const address = process.env.NFT_CONTRACT_ADDRESS ?? "";
    const userAddress = "0xDc7bE36Cbd7B28f13acbdAa084457DA9C6D210D4";

    for (let i = 1; i <= 10; i++) {
      const tokenId = i;
      const response = await fetch(tokenURIs[i - 1]);
      const metadata = await response.json();

      const uuid = `${address.substring(0, 10)}+${tokenId}`;

      const docRef = doc(db, "assets", uuid);
      const userDocRef = doc(db, "users", userAddress);
      const userDocSnap = await getDoc(userDocRef);

      // add created asset under user ownership
      if (userDocSnap.exists()) {
        console.log("user: ", userDocSnap.data());
        const { assets } = userDocSnap.data();

        const newAssets = JSON.parse(JSON.stringify(assets));

        newAssets[uuid] = {
          address,
          tokenId,
          metadata: metadata,
        };

        await updateDoc(userDocRef, {
          assets: newAssets,
        });
      } else {
        console.log("user does not exist");
        const docRef = doc(db, "users", userAddress);
        await setDoc(docRef, {
          address: userAddress,
          createdAt: new Date().toLocaleDateString(),
          assets: {},
        });
        return;
      }

      const timestamp = getTimestamp();

      const event = {
        address: userAddress,
        title: "created this asset",
        subtitle: timestamp,
      };

      const history = { 0: event };

      await setDoc(docRef, {
        address,
        tokenId,
        metadata: metadata,
        history,
      });
    }
  } catch (e) {
    console.log(e);
  }
  return "task completed";
}

async function createListings() {
  try {
    const address = process.env.NFT_CONTRACT_ADDRESS ?? "";
    const userAddress = "0xDc7bE36Cbd7B28f13acbdAa084457DA9C6D210D4";

    for (let i = 1; i <= 10; i++) {
      const tokenId = i;
      const uuid = `${address.substring(0, 10)}+${tokenId}`;

      const docRef = doc(db, "assets", uuid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { history } = docSnap.data();

        const newHistory = JSON.parse(JSON.stringify(history));

        const numEvents = Object.keys(newHistory).length;

        const timestamp = getTimestamp();
        const eventTitle = "listed this asset";

        const event = {
          address: userAddress,
          title: eventTitle,
          subtitle: timestamp,
          price: 0.001,
          fiatPrice: 0.31,
        };

        newHistory[numEvents] = event;

        await updateDoc(docRef, {
          history: newHistory,
        });
      }
    }
    return;
  } catch (e) {
    console.log(e);
  }
}

main();

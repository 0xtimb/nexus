import {
  VStack,
  Image,
  HStack,
  Text,
  Box,
  SimpleGrid,
  Button,
  Spinner,
} from "@chakra-ui/react";
import styles from "@styles/Collection.module.css";
import ImageContainer from "@components/ImageContainer";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { fetchAssets } from "@utils/web3";
import { useContractRead } from "wagmi";
import NexusNFT from "@data/NexusNFT.json";
import { useMemo } from "react";
import { BigNumber } from "ethers";
import { abridgeAddress } from "@utils/abridgeAddress";

function getCoverImage(address) {
  switch (address) {
    case "0xa57262F1D9085cc8b29A5355056EDD8Da9f10200":
      return "/journey.jpg";
    case "0x3595777127FB968808CF5b35Ea4A1fF2098c1331":
      return "/slenderman.jpg";
    case "0x656556f3c2B9fDFCebE43303500327F4773d4aAD":
      return "/pokemon.jpg";
    case "0x78f490acB223A6dF1DF4Bebf275F0A52aB836228":
      return "/cover.jpg";
    case "0xDF539f2B4adFdFC8cC8F238de224dC4d9F842baE":
      return "/nexus.jpg";
    default:
      return "/cover.png";
  }
}

const goerliCollection = process.env.NEXT_PUBLIC_NFT_ADDRESS ?? "";

function Collection() {
  const router = useRouter();
  const { id: collectionAddress } = router.query;
  const [collMetadata, setCollMetadata] = useState<any>();
  const [tokenMetadata, setTokenMetadata] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  console.log(collectionAddress);

  const { data: URI } = useContractRead({
    address: (collectionAddress as string) ?? goerliCollection,
    abi: NexusNFT.abi,
    functionName: "getCollectionURI",
  });

  const { data: tokenId } = useContractRead({
    address: (collectionAddress as string) ?? goerliCollection,
    abi: NexusNFT.abi,
    functionName: "getLastTokenId",
  });

  const fetchCollection = useCallback(async () => {
    if (!URI) return;
    const response = await fetch(URI as string);
    const result = await response.json();

    setCollMetadata(result);
  }, [URI]);

  const numAssets = useMemo(
    () => (tokenId ? (tokenId as BigNumber).toNumber() : 0),
    [tokenId]
  );

  const fetchTokenInfo = useCallback(async () => {
    if (!collectionAddress || numAssets === 0) return;
    try {
      const { assets } = await fetchAssets();
      const filteredAssets = assets
        .filter((asset) => asset.address === collectionAddress)
        .sort((a, b) => a.tokenId - b.tokenId);
      setTokenMetadata(filteredAssets);
    } catch (e) {
      console.log(e);
    }
  }, [numAssets, collectionAddress]);

  useEffect(() => {
    if (!collMetadata) {
      fetchCollection();
    }
    if (numAssets) {
      fetchTokenInfo();
    }
  }, [URI, tokenId, fetchTokenInfo, numAssets]);

  if (!collectionAddress || !collMetadata || tokenMetadata.length === 0)
    return (
      <VStack className={styles.main}>
        <Spinner />
      </VStack>
    );

  return (
    <VStack className={styles.main}>
      <VStack className={styles.collectionImageContainer}>
        <VStack className={styles.collectionCoverImageContainer}>
          <Image
            alt="cover"
            src={getCoverImage(collectionAddress)}
            className={styles.collectionCoverImage}
          ></Image>
        </VStack>
        <Image
          alt="profile"
          src={collMetadata.image}
          className={styles.collectionProfileImage}
        ></Image>
      </VStack>
      <VStack className={styles.titleTextContainer}>
        <Text className={styles.title}>{collMetadata.name}</Text>
        <HStack>
          <Text className={styles.username}>By</Text>
          <Image
            alt="user"
            src="/user.png"
            className={styles.userImage}
          ></Image>
          <Text className={styles.username}>
            {abridgeAddress(collMetadata.creator)}
          </Text>
        </HStack>
        <Text className={styles.subtitle}>{collMetadata.description}</Text>
        <HStack className={styles.statsContainer}>
          <HStack>
            <Text className={styles.attribute}>Total volume</Text>
            <Image alt="theta" src="/theta.png" className={styles.csc}></Image>
            <Text className={styles.attributeBold}>
              <Text fontWeight={700} as="span">
                2K
              </Text>{" "}
              ·
            </Text>
          </HStack>
          <HStack>
            <Text className={styles.attribute}>Floor price</Text>
            <Image alt="theta" src="/theta.png" className={styles.csc}></Image>
            <Text>
              <Text fontWeight={700} as="span">
                0.001 TFUEL
              </Text>{" "}
              ·
            </Text>
          </HStack>
          <Text className={styles.attribute}>
            Items{" "}
            <Text fontWeight={700} as="span">
              {numAssets}
            </Text>{" "}
            · Created{" "}
            <Text fontWeight={700} as="span">
              Nov 2022
            </Text>
          </Text>
        </HStack>
      </VStack>
      <Box className={styles.divider}></Box>
      <HStack className={styles.sectionTitleContainer}>
        <Text className={styles.sectionTitle}>{numAssets} items</Text>
      </HStack>
      <SimpleGrid columns={4} w="100%" gap="1rem">
        {!isLoaded
          ? tokenMetadata
              .slice(0, 8)
              .map(({ metadata, tokenId }, idx) => (
                <ImageContainer
                  key={idx}
                  image={metadata.image_url}
                  title={metadata.name}
                  subtitle={metadata.collection}
                  h="300px"
                  link={`/collection/${collectionAddress}/${tokenId}`}
                />
              ))
          : tokenMetadata.map(({ metadata, tokenId }, idx) => (
              <ImageContainer
                key={idx}
                image={metadata.image_url}
                title={metadata.name}
                subtitle={metadata.collection}
                link={`/collection/${collectionAddress}/${tokenId}`}
              />
            ))}
      </SimpleGrid>
      <VStack pt="2rem">
        {tokenMetadata.length < 8 ||
          (!isLoaded && (
            <Button
              className={styles.landingBtn}
              onClick={() => setLoaded(true)}
            >
              Load more
            </Button>
          ))}
      </VStack>
    </VStack>
  );
}

export default Collection;

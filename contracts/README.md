# NexusProtocol

NexusProtocol is a Solidity contract for creating, managing, and fulfilling listings of ERC721 tokens on the Ethereum blockchain. It provides a decentralized marketplace for unique digital assets (NFTs). This contract is compatible with any ERC721 compliant tokens.

## Features

- Users can create, cancel, and fulfill listings.
- Each listing can be referenced using a unique identifier generated from the collection address and token ID.
- Only the owner of the NFT can create a listing.
- Only the creator of a listing can cancel it.
- Any Ethereum account can fulfill an active listing by sending enough Ether.
- The contract takes a 1% fee on each purchase facilitated.
- The owner of the contract can withdraw accumulated Ether.
- Provides functions to view the listing details, such as buyer, seller, status, and price.

## How to Interact with the Contract

The main interaction methods with this contract are:

- `createListing(address _collectionAddress, uint256 _tokenId, uint256 _price)`: Create a new listing. The sender must own the token and must have granted operator status to the Nexus contract for the ERC721 collection.

- `cancelListing(address _collectionAddress, uint256 _tokenId)`: Cancel an existing listing. The sender must be the original seller of the listing and the listing must be active.

- `fulfillListing(address _collectionAddress, uint256 _tokenId)`: Purchase a listed token. The Ether sent must be greater than or equal to the listed price. The buyer becomes the owner of the token and the original seller receives 99% of the payment.

- `getListingBuyer(address _collectionAddress, uint256 _tokenId)`: Returns the buyer of a specific listing.

- `getListingSeller(address _collectionAddress, uint256 _tokenId)`: Returns the seller of a specific listing.

- `getListingStatus(address _collectionAddress, uint256 _tokenId)`: Returns the status of a specific listing.

- `getListingPrice(address _collectionAddress, uint256 _tokenId)`: Returns the price of a specific listing.

- `hasActiveListing(address _collectionAddress, uint256 _tokenId)`: Checks if a token has an active listing and returns the price if true.

- `withdraw(address payable _dest)`: Withdraws the contract balance to a specified Ethereum address. Only callable by the contract owner.

To interact with the contract, use an Ethereum wallet capable of calling smart contracts, such as MetaMask or similar. The contract ABI is needed to interact with it.

## Prerequisites

- You need to install [Hardhat](https://hardhat.org/) for testing, deploying and interacting with the contract.

## Installation

- Clone the repository: `git clone <repo_url>`
- Install dependencies: `npm install`

## Testing

To run the contract tests:

- Compile the contract: `npx hardhat compile`
- Run the tests: `npx hardhat test`

## Deployment

To deploy the contract:

- Compile the contract: `npx hardhat compile`
- Deploy the contract: `npx hardhat run scripts/deploy.js --network <network>`

Replace `<repo_url>` with the repository's URL, and `<network>` with the Ethereum network you want to deploy to.

## License

This project is licensed under the MIT License.

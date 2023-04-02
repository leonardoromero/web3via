import { ethers } from "hardhat";

async function main() {

  // Contracts are deployed using the first signer/account by default
  const [deployer, trustedManager, ] = await ethers.getSigners();

  const GameManagerFactory = await ethers.getContractFactory("GameManager");
  const gameManager = await GameManagerFactory.deploy(trustedManager.address);

  await gameManager.deployed();

  const NFTFactory = await ethers.getContractFactory("NFT");
  const nftInstance = await NFTFactory.deploy('Web3Via', 'W3V', gameManager.address);

  await nftInstance.deployed();

  await gameManager.changeNFTAddress(nftInstance.address)

  console.log(
    `Game Manager deployed with ${trustedManager} as trusted manager`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

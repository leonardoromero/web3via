import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFT", function () {
  async function deployNFTFixture() {

    // Contracts are deployed using the first signer/account by default
    const [deployer, manager, participant1 ] = await ethers.getSigners();

    const NftContractFactory = await ethers.getContractFactory("NFT");
    const nftContract = await NftContractFactory.deploy('Web3Via', 'W3V', manager.address);

    return { nftContract, deployer, manager, participant1 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { nftContract, manager } = await loadFixture(deployNFTFixture);

      expect(await nftContract.owner()).to.equal(manager.address);
    });

  });

  describe("Mint", function () {


    it("Should allow manager to airdrop an nft", async function () {
      const { nftContract, manager, participant1 } = await loadFixture(
        deployNFTFixture
      );  

      // We use nftContract.connect() to send a transaction from another account
      await nftContract.connect(manager).mint(participant1.address)

      const balance = await nftContract.balanceOf(participant1.address);

      await expect(balance).to.equal(1);
    });

  });

  describe("Token URI", function () {


    it("Should allow manager to change token uri", async function () {
      const { nftContract, manager, participant1 } = await loadFixture(
        deployNFTFixture
      );  

      await nftContract.connect(manager).setBaseURI(
        'https://example.com/tokens/metadata/'
      )

      await nftContract.connect(manager).mint(participant1.address)

      const tokenURI = await nftContract.tokenURI(0);

      await expect(tokenURI).to.equal(
        'https://example.com/tokens/metadata/0'
      );
    });

  });

});

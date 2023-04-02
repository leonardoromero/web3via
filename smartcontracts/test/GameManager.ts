import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("GameManager", function () {
  async function deployGameManagerFixture() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, trustedManager, gameCreator, participant1, participant2, participant3] = await ethers.getSigners();

    const GameManagerFactory = await ethers.getContractFactory("GameManager");
    const gameManager = await GameManagerFactory.deploy(trustedManager.address);

    return { gameManager, deployer, trustedManager, gameCreator, participant1, participant2, participant3 };
  }

  describe("Deployment", function () {
    it("Should set the right trustedManager", async function () {
      const { gameManager, trustedManager } = await loadFixture(deployGameManagerFixture);

      expect(await gameManager.trustedManager()).to.equal(trustedManager.address);
    });

  });

  describe("Game Creation", function () {

    it("Should revert if prize and msg.value are not correct", async function () {
      const { gameManager } = await loadFixture(deployGameManagerFixture);

      const gameId = 123456; // some random number

      const prize = ethers.utils.parseUnits("25","ether")
      const value = ethers.utils.parseUnits("1","ether")

      await expect(gameManager.createGame(gameId, prize, { value }))
        .to.be
        .revertedWithCustomError(gameManager, 'InvalidPrize');
    });

    it("Should create a game with the correct prize, balance and owner", async function () {
      const { gameManager, gameCreator } = await loadFixture(
        deployGameManagerFixture
      );  

      const gameId = 123456;  // some random number
      const prize = ethers.utils.parseUnits("1","ether")
      const value = ethers.utils.parseUnits("1","ether")

      // We use gameManager.connect() to send a transaction from another account
      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      const game = await gameManager.games(gameId);

      await expect(game.balance).to.equal(value);
      await expect(game.owner).to.equal(gameCreator.address);
      await expect(game.prize).to.equal(prize);
    });


  });

  describe("Game Results Published", function () {

    it("Should publish the winners for a game", async function () {
      const { gameManager, trustedManager, gameCreator, participant1, participant2, participant3 } = await loadFixture(deployGameManagerFixture);

      const gameId = 123456;
      const prize = ethers.utils.parseUnits("1","ether");
      const value = ethers.utils.parseUnits("1","ether");


      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      const winners = [
        participant1.address,
        participant2.address
      ]

      await gameManager.connect(trustedManager).publishGameResult(gameId, winners)

      const winnersOnChain = await gameManager.gameWinners(gameId);

      for (let i = 0; i<winnersOnChain.length; i++) {
        expect(winnersOnChain[i]).to.equal(winners[i]);
      }

      for (let i = 0; i<winnersOnChain.length; i++) {

        const winner = winnersOnChain[i];

        const prizeOnChain = await gameManager.prizeGameWinner(gameId, winner);

        expect(prizeOnChain).to.equal( prize );
      }
      
    });

  });

  describe("Game Prize Claim", function () {

    it("A winner should be able to claim prize ", async function () {
      const { gameManager, trustedManager, gameCreator, participant1, participant2, participant3 } = await loadFixture(deployGameManagerFixture);

      // Step 1 Create Game
      const gameId = 123456;
      const prize = ethers.utils.parseUnits("5","ether")
      const value = ethers.utils.parseUnits("10","ether")

      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      // Step 2 Publish result
      const winners = [participant1.address, participant2.address]
      await gameManager.connect(trustedManager).publishGameResult(gameId, winners)

      // Step 3 Claim prize
      const winnersBalanceBefore = await participant1.getBalance();

      await gameManager.connect(participant1).claimPrize(gameId)

      const winnersBalanceAfter = await participant1.getBalance();

      expect(winnersBalanceBefore).to.be.lessThan(winnersBalanceAfter);

      const prizeOnChain = await gameManager.prizeGameWinner(gameId, participant1.address);

      expect(prizeOnChain).to.be.lessThanOrEqual(prize);

    });

    it("A winner should receive an NFT ", async function () {
      // Step 0 Setup NFT contract link to game manager contract
      const { gameManager, trustedManager, gameCreator, participant1 } = await loadFixture(deployGameManagerFixture);
      await gameManager.deployed();

      const NFTFactory = await ethers.getContractFactory("NFT");
      const nftContract = await NFTFactory.deploy('Web3Via', 'W3V', gameManager.address);
      await gameManager.connect(trustedManager).changeNFTAddress(nftContract.address)

      // Step 1 Create Game
      const gameId = 123456;
      const prize = ethers.utils.parseUnits("5","ether")
      const value = ethers.utils.parseUnits("10","ether")

      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      // Step 2 Publish result
      const winners = [participant1.address, ]
      await gameManager.connect(trustedManager).publishGameResult(gameId, winners)

      // Step 3 Claim prize
      await gameManager.connect(participant1).claimPrize(gameId)

      const nftBalance = await nftContract.balanceOf(participant1.address);

      expect(nftBalance).to.equal(1);

    });

    it("A loser shouldn't be able to claim prize ", async function () {
      const { gameManager, trustedManager, gameCreator, participant1, participant2, participant3 } = await loadFixture(deployGameManagerFixture);

      // Step 1 Create Game
      const gameId = 123456;
      const prize = ethers.utils.parseUnits("5","ether")
      const value = ethers.utils.parseUnits("10","ether")

      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      // Step 2 Publish result
      const winners = [participant1.address, participant2.address]
      await gameManager.connect(trustedManager).publishGameResult(gameId, winners)

      // Step 3 Claim prize
      await expect(gameManager.connect(participant3).claimPrize(gameId))
          .to.be
          .revertedWithCustomError(gameManager, 'NoPrizeOrAlreadyClaimed');


    });

    it("A game creator should be able to airdrop a prize to a winner", async function () {
      const { gameManager, trustedManager, gameCreator, participant1, participant2, participant3 } = await loadFixture(deployGameManagerFixture);

      // Step 1 Create Game
      const gameId = 123456;
      const prize = ethers.utils.parseUnits("5","ether")
      const value = ethers.utils.parseUnits("10","ether")

      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      // Step 2 Publish result
      const winners = [participant1.address, participant2.address]
      await gameManager.connect(trustedManager).publishGameResult(gameId, winners)

      // Step 3 Claim prize
      const winnersBalanceBefore = await participant2.getBalance();

      await gameManager.connect(gameCreator).airdropPrize(gameId, participant2.address)

      const winnersBalanceAfter = await participant2.getBalance();

      expect(winnersBalanceBefore).to.be.lessThan(winnersBalanceAfter);

      const prizeOnChain = await gameManager.prizeGameWinner(gameId, participant2.address);

      expect(prizeOnChain).to.be.lessThanOrEqual(prize);

    });

    it("A game creator shouldn't be able to airdrop a prize to a random address", async function () {
      const { gameManager, trustedManager, gameCreator, participant1, participant2, participant3 } = await loadFixture(deployGameManagerFixture);

      // Step 1 Create Game
      const gameId = 123456;
      const prize = ethers.utils.parseUnits("5","ether")
      const value = ethers.utils.parseUnits("10","ether")

      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      // Step 2 Publish result
      const winners = [participant1.address, participant2.address]
      await gameManager.connect(trustedManager).publishGameResult(gameId, winners)

      // Step 3 Claim prize
      await expect(gameManager.connect(gameCreator).airdropPrize(gameId, participant3.address))
          .to.be
          .revertedWithCustomError(gameManager, 'NoPrizeOrAlreadyClaimed');
      
    });
  
    it("A random address shouldn't be able to airdrop prize ", async function () {
      const { gameManager, trustedManager, gameCreator, participant1, participant2, participant3 } = await loadFixture(deployGameManagerFixture);

      // Step 1 Create Game
      const gameId = 123456;
      const prize = ethers.utils.parseUnits("5","ether")
      const value = ethers.utils.parseUnits("10","ether")

      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      // Step 2 Publish result
      const winners = [participant1.address, participant2.address]
      await gameManager.connect(trustedManager).publishGameResult(gameId, winners)

      // Step 3 Claim prize
      await expect(gameManager.connect(participant3).airdropPrize(gameId, participant3.address))
          .to.be
          .revertedWithCustomError(gameManager, 'Unauthorized');

    });

  });

  describe("Events", function () {
    it("Should emit an event on game creation", async function () {
      const { gameManager, gameCreator } = await loadFixture(
        deployGameManagerFixture
      );

      const gameId = 123456; // some random number
      const prize = ethers.utils.parseUnits("1","ether")
      const value = ethers.utils.parseUnits("3","ether")

      await expect(gameManager.connect(gameCreator).createGame(gameId, prize, { value }))
        .to.emit(gameManager, "GameCreated")
        .withArgs(gameId, prize, value, gameCreator.address);
    });

    it("Should emit an event on game results publishing", async function () {

        const { gameManager, gameCreator, trustedManager, participant1, participant2, participant3 } = await loadFixture(
          deployGameManagerFixture
        );
  
        const gameId = 123456; // some random number
  
        const prize = ethers.utils.parseUnits("1","ether")
        const value = ethers.utils.parseUnits("3","ether")
  
        await gameManager.connect(gameCreator).createGame(gameId, prize, { value })
  
        const winners = [
          participant1.address,
          participant2.address,
          participant3.address
        ]
  
        await expect(
            gameManager
              .connect(trustedManager)
              .publishGameResult(gameId, winners)
          )
          .to.emit(gameManager, "GameResult")
          .withArgs(gameId);

    });

    it("Should emit an event on winners' prize claim", async function () {
      const { gameManager, trustedManager, gameCreator, participant1 } = await loadFixture(
        deployGameManagerFixture
      );

      const gameId = 123456; // some random number

      const prize = ethers.utils.parseUnits("1","ether")
      const value = ethers.utils.parseUnits("3","ether")

      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      const winners = [
        participant1.address
      ]

      await gameManager.connect(trustedManager).publishGameResult(gameId, winners)

      await expect(
          gameManager
            .connect(participant1)
            .claimPrize(gameId)
          )
        .to.emit(gameManager, "PrizeClaimed")
        .withArgs(prize, participant1.address);
    });

  });
});

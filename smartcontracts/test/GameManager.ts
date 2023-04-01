import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("GameManager", function () {
  async function deployGameManagerFixture() {

    // Contracts are deployed using the first signer/account by default
    const [deployer, trustedManager, gameCreator, participant1, participant2, participant3] = await ethers.getSigners();

    const GameManagerFactory = await ethers.getContractFactory("GameManager");
    const gameManager = await GameManagerFactory.deploy(trustedManager);

    return { gameManager, deployer, trustedManager, gameCreator, participant1, participant2, participant3 };
  }

  describe("Deployment", function () {
    it("Should set the right trustedManager", async function () {
      const { gameManager, trustedManager } = await loadFixture(deployGameManagerFixture);

      expect(await gameManager.trustedManager()).to.equal(trustedManager);
    });

  });

  describe("Game Creation", function () {

    it("Should revert if prize and msg.value are not correct", async function () {
      const { gameManager } = await loadFixture(deployGameManagerFixture);

      const gameId = 123456; // some random number
      const prize = 25;      // wei
      const value = 1;       // wei

      await expect(gameManager.createGame(gameId, prize, { value })).to.be.revertedWith(
        "Prize for each winner should be equal or less than the total prize"
      );
    });

    it("Should create a game with the correct prize, balance and owner", async function () {
      const { gameManager, gameCreator } = await loadFixture(
        deployGameManagerFixture
      );  

      const gameId = 123456; // some random number
      const prize = 100;      // wei
      const value = 100;       // wei

      // We use gameManager.connect() to send a transaction from another account
      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      const game = gameCreator.games(gameId);

      await expect(game.balance).to.equal(value);
      await expect(game.owner).to.equal(gameCreator);
      await expect(game.prize).to.equal(prize);
    });


  });

  describe("Events", function () {
    it("Should emit an event on game creation", async function () {
      const { gameManager, gameCreator } = await loadFixture(
        deployGameManagerFixture
      );

      const gameId = 123456; // some random number
      const prize = 10;     // wei
      const value = 30;     // wei

      await expect(gameManager.connect(gameCreator).createGame(gameId, prize, { value }))
        .to.emit(gameManager, "GameCreated")
        .withArgs(gameId, prize, prize, gameCreator);
    });

    it("Should emit an event on game results publishing", async function () {

        const { gameManager, gameCreator, participant1, participant2, participant3 } = await loadFixture(
          deployGameManagerFixture
        );
  
        const gameId = 123456; // some random number
  
        const prize = 10;     // wei
        const value = 30;     // wei
  
        await gameManager.connect(gameCreator).createGame(gameId, prize, { value })
  
        const winners = [
          participant1,
          participant2,
          participant3
        ]
  
        await gameManager.connect(gameCreator).publishGameResult(gameId, winners)
  
        await expect(gameManager.claimPrize(gameId))
          .to.emit(gameManager, "GameResult")
          .withArgs(gameId);

    });

    it("Should emit an event on winners' prize claim", async function () {
      const { gameManager, gameCreator, participant1 } = await loadFixture(
        deployGameManagerFixture
      );

      const gameId = 123456; // some random number

      const prize = 10;     // wei
      const value = 30;     // wei

      await gameManager.connect(gameCreator).createGame(gameId, prize, { value })

      const winners = [
        participant1
      ]

      await gameManager.connect(gameCreator).publishGameResult(gameId, winners)

      await expect(gameManager.claimPrize(gameId))
        .to.emit(gameManager, "PrizeClaimed")
        .withArgs(prize, participant1);
    });

  });
});

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IERC721Mintable is IERC721 {
  function mint(address to) external;
}

error Unauthorized();

error InvalidPrize(); // 'Prize for each winner should be equal or less than the total prize'

error InsuficientGameBalance();

error NoPrizeOrAlreadyClaimed();

/** 
 * @title Web3via GameManager
 */
contract GameManager {

  struct Game {
    uint256 balance;
    uint256 prize;
    address[] winners;
    mapping(address => uint256) winnersBalance;
  }

  address public trustedManager;
  IERC721Mintable public NFT;

  mapping(uint256 => Game) public games;

  constructor( address _trustedManager) {
    trustedManager = _trustedManager;
  }

  modifier onlyTrustedManager() {
    if(msg.sender != trustedManager) {
      revert Unauthorized();
    }
    _;
  }

  function changeNFTAddress(address newNFTAddress) public onlyTrustedManager {
    NFT = IERC721Mintable(newNFTAddress);
  }

  function changeTrustedManager(address newManager) public onlyTrustedManager {
    trustedManager = newManager;
  }

  event GameResult(uint256 gameId);

  function publishGameResult(uint256 gameId, address[] memory _winners) public onlyTrustedManager {

    for (uint256 i=0; i < _winners.length; ++i) {

      games[gameId].winners.push( _winners[i] );

      games[gameId].winnersBalance[ _winners[i] ] = games[gameId].prize;

    }
    emit GameResult(gameId);
  }

  event GameCreated(uint256 gameId, uint256 prize, uint256 balance);

  function createGame(uint256 gameId, uint256 prize) public payable {

    if (msg.value < prize) {
      revert InvalidPrize();
    }

    games[gameId].prize = prize;
    games[gameId].balance = msg.value;

    emit GameCreated(gameId, prize, msg.value);

  }

  event PrizeClaimed(uint256 prize, address winner);

  function claimPrize(uint256 gameId) public {
    _sendPrize(gameId, msg.sender);
  }

  function airdropPrize(uint256 gameId) public onlyTrustedManager {
    for (uint256 i = 0 ; i < games[gameId].winners.length; ++i) {
      _sendPrize(gameId, games[gameId].winners[i]);
    }
  }

  function _sendPrize(uint256 gameId, address winner) private {
    uint256 winnersPrize = games[gameId].winnersBalance[ winner ];
    uint256 gameBalance = games[gameId].balance;

    if (winnersPrize <= 0) {
      revert NoPrizeOrAlreadyClaimed();
    } 

    if (gameBalance < winnersPrize) {
      revert InsuficientGameBalance();
    }

    games[gameId].balance -= winnersPrize;

    (bool success, ) = (payable(address(winner))).call{ value: winnersPrize }('');

    require(success);

    if (address(NFT) != address(0)) {
      NFT.mint(winner);
    }

    emit PrizeClaimed(winnersPrize, winner);

  }

  function gamePrize(uint256 gameId) public view returns (uint256 prize) {
    return games[gameId].prize;
  }

  function gameWinners(uint256 gameId) public view returns (address[] memory winners) {
    return games[gameId].winners;
  }

  function prizeGameWinner(uint256 gameId, address winner) public view returns (uint256 prize) {
    return games[gameId].winnersBalance[ winner ];
  }
}
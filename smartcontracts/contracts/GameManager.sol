// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Web3via GameManager
 */
contract GameManager {

  struct Game {

    uint256 balance;
    uint256 prize;
    address owner;
    address[] winners;
    mapping(address => uint256) winnersBalance;
  }

  address public trustedManager;

  mapping(uint256 => Game) public games;

  constructor( address _trustedManager ) {
    trustedManager = _trustedManager;
  }

  modifier onlyTrustedManager() {
    require(msg.sender == trustedManager);
    _;
  }

  modifier onlyGameOwner(uint256 gameId) {
    require(msg.sender == games[gameId].owner);
    _;
  }

  function changeTrustedManager(address newManager) public onlyTrustedManager {
    trustedManager = newManager;
  }

  event GameResult(uint256 gameId);

  function publishGameResult(uint256 gameId, address[] memory _winners) public onlyTrustedManager {
    for (uint256 i=0; i < _winners.length; ++i) {
        games[ gameId ].winnersBalance[ _winners[i] ] = games[i].prize;
    }
    emit GameResult(gameId);
  }

  event GameCreated(uint256 gameId, uint256 prize, uint256 balance, address owner);

  function createGame(uint256 gameId, uint256 prize) public payable {

    require(prize <= msg.value, 'Prize for each winner should be equal or less than the total prize');

    games[gameId].owner = msg.sender;
    games[gameId].prize = prize;
    games[gameId].balance = msg.value;

    emit GameCreated(gameId, prize, msg.value, msg.sender);

  }

  event PrizeClaimed(uint256 prize, address winner);

  function claimPrize(uint256 gameId) public {
    _sendPrize(gameId, msg.sender);
  }

  function airdropPrize(uint256 gameId, address _winner) public onlyGameOwner(gameId) {
    _sendPrize(gameId, _winner);
  }

  function _sendPrize(uint256 gameId, address winner) private {
    uint256 winnersPrize = games[gameId].winnersBalance[winner];
    uint256 gameBalance = games[gameId].balance;

    require(winnersPrize > 0, "No ganaste nada campeon");
    require(gameBalance > winnersPrize, "No hay guita");

    games[gameId].balance -= winnersPrize;

    (bool success, ) = (payable(address(winner))).call{ value: winnersPrize }('');

    require(success);

    emit PrizeClaimed(winnersPrize, winner);

  }

  function gamePrize(uint256 gameId) public view returns (uint256 prize) {
    return games[gameId].prize;
  }

  function gameWinners(uint256 gameId) public view returns (address[] memory winners) {
    return games[gameId].winners;
  }
}
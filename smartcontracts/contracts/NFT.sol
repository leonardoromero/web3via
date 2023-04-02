// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error Unauthorized();

contract NFT is ERC721, ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;


  string public baseURI;

  constructor(string memory _tokenName, string memory _tokenSymbol, address _manager) ERC721(_tokenName, _tokenSymbol) {
    transferOwnership(_manager);
  }


  function mint(address to) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
  }


  function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
    internal
    override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  function _burn(uint256 tokenId) internal override(ERC721) {
    super._burn(tokenId);
  }

  function setBaseURI(string memory newURI) public onlyOwner {
    baseURI = newURI;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }
    

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721)
    returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
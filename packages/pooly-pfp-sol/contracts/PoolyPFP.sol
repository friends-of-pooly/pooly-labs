pragma solidity ^0.8.13;
//SPDX-License-Identifier: MIT

import { ERC721, ERC721Royalty } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
      ___         ___           ___                                     ___           ___           ___                         ___     
     /\  \       /\  \         /\  \                                   /\__\         /\  \         /\  \         _____         /\__\    
    /::\  \     /::\  \       /::\  \                       ___       /:/  /        /::\  \       /::\  \       /::\  \       /:/ _/_   
   /:/\:\__\   /:/\:\  \     /:/\:\  \                     /|  |     /:/  /        /:/\:\  \     /:/\:\__\     /:/\:\  \     /:/ /\  \  
  /:/ /:/  /  /:/  \:\  \   /:/  \:\  \   ___     ___     |:|  |    /:/  /  ___   /:/ /::\  \   /:/ /:/  /    /:/  \:\__\   /:/ /::\  \ 
 /:/_/:/  /  /:/__/ \:\__\ /:/__/ \:\__\ /\  \   /\__\    |:|  |   /:/__/  /\__\ /:/_/:/\:\__\ /:/_/:/__/___ /:/__/ \:|__| /:/_/:/\:\__\
 \:\/:/  /   \:\  \ /:/  / \:\  \ /:/  / \:\  \ /:/  /  __|:|__|   \:\  \ /:/  / \:\/:/  \/__/ \:\/:::::/  / \:\  \ /:/  / \:\/:/ /:/  /
  \::/__/     \:\  /:/  /   \:\  /:/  /   \:\  /:/  /  /::::\  \    \:\  /:/  /   \::/__/       \::/~~/~~~~   \:\  /:/  /   \::/ /:/  / 
   \:\  \      \:\/:/  /     \:\/:/  /     \:\/:/  /   ~~~~\:\  \    \:\/:/  /     \:\  \        \:\~~\        \:\/:/  /     \/_/:/  /  
    \:\__\      \::/  /       \::/  /       \::/  /         \:\__\    \::/  /       \:\__\        \:\__\        \::/  /        /:/  /   
     \/__/       \/__/         \/__/         \/__/           \/__/     \/__/         \/__/         \/__/         \/__/         \/__/ 
*/

contract PoolyPFP is ERC721Royalty, Ownable {
  /// @notice Total supply of NFTs
  uint256 public totalSupply;

  /// @notice NFT tokens base URI
  string public baseURI;

  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) Ownable() {}

  function setBaseURI(string memory baseURI_) external onlyOwner {
    baseURI = baseURI_;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }
}

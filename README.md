# Pooly Cards Labs

The "Pooly Lab" module is a supercharged mono-repo: _built for rapid prototyping_.

Bringing together smart contracts, interfaces and other utility libraries into a professional Web3 developer environment, while also having very few opinions about how a project should be structured. The Labs uses [Turborepo](https://turborepo.org/) to accelerate development via a high-performance build system for JavaScript and TypeScript codebases.

## Applications

### [Pooly PFP App](https://github.com/pooly-cards/pooly-labs/tree/main/apps/pfp-app)
The "[Pooly PFP App](https://github.com/pooly-cards/pooly-labs/tree/main/apps/pfp-app)" is a [Rainbow Kit](https://www.rainbowkit.com/) powered decentralized application. 

Interacting with (`@pooly-cards/pooly-pfp-sol`) module smart contract API used to generate NFT images.

<img width="450px" src="https://user-images.githubusercontent.com/3408362/172071387-b9fbe2c4-116a-40b7-8955-7e060cd03a5c.png"/>

## Packages

### [Pooly PFP Smart Contracts](https://github.com/pooly-cards/pooly-labs/tree/main/packages/pooly-pfp-sol)
The "[Pooly PFP Smart Contracts](https://github.com/pooly-cards/pooly-labs/tree/main/packages/pooly-pfp-sol)" module (`@pooly-cards/pooly-pfp-sol`) is a simple ERC721 NFT which can inherits from the `@pooly-cards/svg-lib-sol` module to inherit on-chain, dynamic SVG rendering capabilities.

```
pragma solidity ^0.8.13;
//SPDX-License-Identifier: MIT

import { ERC721, ERC721Royalty } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PoolyPFP is ERC721Royalty, Ownable {
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
```

### [SVG Library Smart Contracts](https://github.com/pooly-cards/pooly-labs/tree/main/packages/svg-lib-sol)

The "[SVG Library Smart Contracts](https://github.com/pooly-cards/pooly-labs/tree/main/packages/svg-lib-sol)" module (`@pooly-cards/svg-lib-sol`) is an experimental smart contract library for constructing, dynamic SVG's using on-chain data feeds: token balances, vault staking, soulbound items, etc...

Forked from https://github.com/w1nt3r-eth/hot-chain-svg the contracts will continue to expand on-chain SVG construction patterns. Specifically how to create/add in-bound data streams using gas-efficient data structures.

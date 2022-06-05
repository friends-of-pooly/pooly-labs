# Pooly Cards Labs

The "Pooly Card Labs" repo is a supercharged mono-repo: built for rapid prototyping and new experiments.

Application:
- Pooly PFP Viewer (`@pooly-cards/pfp-app`)

Packages:
- Pooly PFP Smart Contracts (`@pooly-cards/pooly-pfp-sol`)
- SVG Library Smart Contracts (`@pooly-cards/svg-lib-sol`)

## Applications

### Pooly PFP View
The "Pooly PFP View" application is a Rainbow Kit + Next decentralized application. The application uses the `PoolyPFP` module (`@pooly-cards/pooly-pfp-sol`) to communicate with the smart contract image API used to generate NFT images.

## Packages

### Pooly PFP Smart Contracts
The "Pooly PFP Smart Contracts" module (`@pooly-cards/pooly-pfp-sol`) is a simple ERC721 NFT which can inherits from the `@pooly-cards/svg-lib-sol` module to inherit on-chain, dynamic SVG rendering capabilities.

### SVG Library Smart Contracts

The "SVG Library Smart Contracts" module (`@pooly-cards/svg-lib-sol`) is an experimental smart contract library for constructing, dynamic SVG's using on-chain data feeds: token balances, vault staking, soulbound items, etc...

Forked from https://github.com/w1nt3r-eth/hot-chain-svg the contracts will continue to expand on-chain SVG construction patterns. Specifically how to create/add in-bound data streams using gas-efficient data structures.
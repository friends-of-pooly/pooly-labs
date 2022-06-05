//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@pooly-cards/svg-lib-sol/contracts/SVG.sol";
import "@pooly-cards/svg-lib-sol/contracts/Utils.sol";

contract PoolyPFPRenderer {
  function render(uint256 _tokenId) public pure returns (string memory) {
    return
      string.concat(
        '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" style="background:#541563">',
        svg.text(
          string.concat(
            svg.prop("x", "20"),
            svg.prop("y", "40"),
            svg.prop("font-size", "22"),
            svg.prop("fill", "white")
          ),
          string.concat(svg.cdata("Pooly PFP #"), utils.uint2str(_tokenId))
        ),
        svg.rect(
          string.concat(
            svg.prop("fill", "purple"),
            svg.prop("x", "20"),
            svg.prop("y", "50"),
            svg.prop("width", utils.uint2str(160)),
            svg.prop("height", utils.uint2str(10))
          ),
          utils.NULL
        ),
        "</svg>"
      );
  }

  function example() external pure returns (string memory) {
    return render(1);
  }

  function generate(uint256 id) external pure returns (string memory) {
    return "test";
  }
}

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@pooly-cards/svg-lib-sol/contracts/libraries/SVG.sol";
import "@pooly-cards/svg-lib-sol/contracts/libraries/SVGUtils.sol";
import "@pooly-cards/svg-lib-sol/contracts/SVGColor.sol";
import "@pooly-cards/svg-lib-sol/contracts/SVGWidgets.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PoolyPFPRenderer {

  ERC20 public token;
  SVGColor public svgColor;
  SVGWidgets public svgWidgets;

  mapping(uint256 => address) public owners;

  constructor(ERC20 _token, SVGColor _svgColor, SVGWidgets _svgWidgets) public {
    token = _token;
    svgColor = _svgColor;
    svgWidgets = _svgWidgets;
    owners[1] = msg.sender;
  }

  function render(uint256 _tokenId) public view returns (string memory) {
    address _owner = owners[_tokenId];
    string memory _symbol = token.symbol(); 
    string memory _name = token.name();
    uint256 _decimals = token.decimals();
    uint256 _balance = token.balanceOf(_owner);
    uint256 _viewB = _balance / (10 ** _decimals);
    return
      string(
        abi.encodePacked(
          svg.start(),
          svgWidgets.getDefs(),
          svg.rect(
            string.concat(
              svg.prop("fill", "url('#gradient-aave')"),
              svg.prop("x", "0"),
              svg.prop("y", "0"),
              svg.prop("width", "100%"),
              svg.prop("height", "100%")
            ),
            svgUtils.NULL
          ),
          svg.text(
            string.concat(
              svg.prop("x", "20"),
              svg.prop("y", "40"),
              svg.prop("font-size", "22"),
              svg.prop("fill", "white")
            ),
            string.concat(svg.cdata("Pooly PFP #"), svgUtils.uint2str(_tokenId))
          ),
          svg.image(
            "https://github.com/friends-of-pooly/pooly-assets/blob/main/general/cooly.png?raw=true", 
            string.concat(
              svg.prop("x", "5%"),
              svg.prop("y", "25%"),
              svg.prop("width", "50%"),
              svg.prop("height", "50%")
            )
          ),
          svg.text(
            string.concat(
              svg.prop("x", "5%"),
              svg.prop("y", "90%"),
              svg.prop("fill", "white"),
              svg.prop("font-weight", "bold")
            ),
            _symbol
          ),
          svg.text(
            string.concat(
              svg.prop("x", "50%"),
              svg.prop("y", "90%"),
              svg.prop("fill", "white")
            ),
            string.concat(svg.cdata("balance:"), svgUtils.uint2str(_viewB))
          ),
          svg.end()
        )
      );
  }

  function example() external view returns (string memory) {
    return render(1);
  }
}

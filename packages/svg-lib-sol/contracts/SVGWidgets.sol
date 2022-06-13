//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/ISVGColor.sol";
import "./libraries/SVG.sol";

/**
  * @title  SVG Widgets
  * @author Kames Geraghty
  * @notice The SVG Widgets smart contract is a collection of SVG widgets that can be rendered on-chain.
*/
contract SVGWidgets {

    using Strings for uint256;
    
    ISVGColor public svgColor;

    /* ================================================================================ */
    /* Constructor & Modifiers                                                          */
    /* ================================================================================ */
    constructor(address _svgColor){
        svgColor  = ISVGColor(_svgColor);
    }

    /* ================================================================================ */
    /* External Functions                                                               */
    /* ================================================================================ */
    function getDefs() external view returns (string memory) {
        return svg.defs(
            svg.linearGradient(
              string.concat(
                svg.prop("id", "gradient-aave"),
                svg.prop("gradientTransform", "rotate(140)")
              ),
              string.concat(
                svg.stop(
                  string.concat(
                    svg.prop("offset", "0%"),
                    svg.prop("stop-color", svgColor.getRgba("Aave1"))
                  )
                ),
                svg.stop(
                  string.concat(
                    svg.prop("offset", "50%"),
                    svg.prop("stop-color", svgColor.getRgba("Aave2"))
                  )
                )
              )
            )
        );
    }

    /* ================================================================================ */
    /* Internal Functions                                                               */
    /* ================================================================================ */
    
}
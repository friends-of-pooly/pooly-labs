// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ISVGColor {
    function getColor(string memory) external view returns (bytes memory);
    function getColor(string memory, uint8 )
    external view returns (bytes memory);
    function getRgba(string memory )
    external view returns (string memory);
}
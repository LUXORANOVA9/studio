/ SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LuxoraScrolls is ERC1155, Ownable {
    using Strings for uint256;

    string public baseURI;
    uint256 public constant GOLD = 1;
    uint256 public constant PLATINUM = 2;
    uint256 public constant TITANIUM = 3;

    // Address of the $LUXO token contract
    address public luxoTokenAddress;

    constructor(string memory _name, string memory _symbol, string memory _baseURI, address _luxoTokenAddress) ERC1155(_baseURI) Ownable() {
        baseURI = _baseURI;
        // Mint initial supply. Example: 100 of each type.
        _mint(msg.sender, GOLD, 100, "");
        _mint(msg.sender, PLATINUM, 100, "");
        _mint(msg.sender, TITANIUM, 100, "");
        luxoTokenAddress = _luxoTokenAddress;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(_id), ".json"));
    }

    function setSuperAdmin(address newSuperAdmin) public onlyOwner {
        _transferOwnership(newSuperAdmin);
    }

    // Function to set the $LUXO token contract address
    function setLuxoTokenAddress(address _luxoTokenAddress) public onlyOwner {
        luxoTokenAddress = _luxoTokenAddress;
    }

    // Example function to reward scroll holders with $LUXO tokens (can be extended)
    function rewardScrollHolders(uint256 _id, address[] memory _recipients, uint256 _amount) public onlyOwner {
        // Add logic to interact with the $LUXO token contract and transfer tokens
        // This is a placeholder, you'll need to implement the actual token transfer
        // Ensure that the luxoTokenAddress is properly set and the contract supports transfers

        // Placeholder code:
        for (uint256 i = 0; i < _recipients.length; i++) {
            // Call the $LUXO token contract to transfer tokens to _recipients[i]
            // Example: IERC20(luxoTokenAddress).transfer(_recipients[i], _amount);
            // Replace IERC20 with the actual interface of your $LUXO token contract
            // Make sure the contract supports ERC20 or similar token standards
        }
    }
}

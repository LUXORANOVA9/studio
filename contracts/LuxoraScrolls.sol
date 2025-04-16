/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LuxoraNovaScrollLicense is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    uint256 public clonePrice;
    address public revenueReceiver;

    constructor(uint256 _clonePrice, address _receiver) ERC721("LuxoraNova License", "LUXCLONE") {
        clonePrice = _clonePrice;
        revenueReceiver = _receiver;
    }

    function mintScroll(string memory tokenURI) external payable {
        require(msg.value >= clonePrice, "Insufficient MATIC to mint clone");
        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        payable(revenueReceiver).transfer(msg.value);
    }

    function updatePrice(uint256 _newPrice) external onlyOwner {
        clonePrice = _newPrice;
    }

    function updateReceiver(address _newReceiver) external onlyOwner {
        revenueReceiver = _newReceiver;
    }

    function withdrawAll() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}

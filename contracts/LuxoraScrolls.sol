// contracts/LuxoraScrolls.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LuxoraScrolls is ERC1155, Ownable {
    using Strings for uint256;

    // Define token IDs for the different scroll tiers
    uint256 public constant GOLD_SCROLL = 1;
    uint256 public constant PLATINUM_SCROLL = 2;
    uint256 public constant TITANIUM_SCROLL = 3;

    // Mapping from token ID to its metadata URI
    mapping(uint256 => string) public metadataURIs;

    // Royalty fee receiver and percentage (10% = 1000)
    address public royaltyReceiver;
    uint256 public royaltyPercentage = 1000; // 10%

    // Base URI for metadata
    string public baseURI;

    constructor(string memory _name, string memory _symbol, string memory _baseURI) ERC1155("") Ownable(msg.sender) {
        baseURI = _baseURI;
        royaltyReceiver = msg.sender; // SuperAdmin is the initial royalty receiver
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setMetadataURI(uint256 _tokenId, string memory _uri) public onlyOwner {
        metadataURIs[_tokenId] = _uri;
    }

    function setRoyaltyReceiver(address _newReceiver) public onlyOwner {
        royaltyReceiver = _newReceiver;
    }

    function setRoyaltyPercentage(uint256 _newPercentage) public onlyOwner {
        require(_newPercentage <= 10000, "Royalty percentage cannot exceed 100%");
        royaltyPercentage = _newPercentage;
    }

    function mint(address _to, uint256 _id, uint256 _amount, bytes memory _data) public onlyOwner {
        _mint(_to, _id, _amount, _data);
    }

    function burn(address _from, uint256 _id, uint256 _amount) public onlyOwner {
        _burn(_from, _id, _amount);
    }

    function uri(uint256 _tokenId) public view override returns (string memory) {
        string memory specificURI = metadataURIs[_tokenId];
        if (bytes(specificURI).length > 0) {
            return specificURI;
        }
        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getRoyalty(uint256 _tokenId, uint256 _salePrice) public view returns (address, uint256) {
        uint256 royaltyAmount = (_salePrice * royaltyPercentage) / 10000;
        return (royaltyReceiver, royaltyAmount);
    }
}

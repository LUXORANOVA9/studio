// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LuxoraScrolls is ERC1155, Ownable {
    using Strings for uint256;

    uint256 public constant GOLD = 1;
    uint256 public constant PLATINUM = 2;
    uint256 public constant TITANIUM = 3;

    string public baseURI;
    address public luxoTokenAddress;
    address public superAdmin;

    mapping(uint256 => uint256) public scrollPrices;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        address _luxoTokenAddress
    ) ERC1155(_baseURI) {
        baseURI = _baseURI;
        luxoTokenAddress = _luxoTokenAddress;
        _setSuperAdmin(_msgSender());

        scrollPrices[GOLD] = 100 * 10 ** 18;       // 100 LUXO tokens
        scrollPrices[PLATINUM] = 500 * 10 ** 18;   // 500 LUXO tokens
        scrollPrices[TITANIUM] = 1000 * 10 ** 18;  // 1000 LUXO tokens
    }

    modifier onlySuperAdmin() {
        require(_msgSender() == superAdmin, "Caller is not super admin");
        _;
    }

    function setSuperAdmin(address _superAdmin) external onlyOwner {
        _setSuperAdmin(_superAdmin);
    }

    function _setSuperAdmin(address _newSuperAdmin) internal {
        superAdmin = _newSuperAdmin;
    }

    function setBaseURI(string memory _baseURI) external onlySuperAdmin {
        baseURI = _baseURI;
    }

    function setScrollPrice(uint256 _id, uint256 _price) external onlySuperAdmin {
        require(_id == GOLD || _id == PLATINUM || _id == TITANIUM, "Invalid scroll ID");
        scrollPrices[_id] = _price;
    }

    function mint(address account, uint256 id, uint256 amount) external onlySuperAdmin {
        require(id == GOLD || id == PLATINUM || id == TITANIUM, "Invalid scroll ID");
        _mint(account, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts) external onlySuperAdmin {
        _mintBatch(to, ids, amounts, "");
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(tokenId == GOLD || tokenId == PLATINUM || tokenId == TITANIUM, "Invalid scroll ID");
        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }

    function setLuxoTokenAddress(address _luxoTokenAddress) external onlySuperAdmin {
        luxoTokenAddress = _luxoTokenAddress;
    }

    function withdrawRoyalties() external onlySuperAdmin {
      uint256 balance = address(this).balance;
      payable(superAdmin).transfer(balance);
    }

    receive() external payable {}
}

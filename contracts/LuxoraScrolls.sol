{// SPDX-License-Identifier: MIT
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

    uint256 public constant MAX_SUPPLY = 1000; // Total supply for all scroll types

    mapping(uint256 => uint256) public totalSupply;

    constructor(string memory _name, string memory _symbol, string memory _baseURI) ERC1155(_baseURI) {
        baseURI = _baseURI;
        _setOwner(msg.sender);
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        require(_id > 0 && _id <= 3, "Invalid token ID");
        return string(abi.encodePacked(baseURI, _id.toString(), ".json"));
    }

    function mint(address _to, uint256 _id, uint256 _amount) public onlyOwner {
        require(_id > 0 && _id <= 3, "Invalid token ID");
        require(totalSupply[_id] + _amount <= MAX_SUPPLY, "Exceeds max supply");

        totalSupply[_id] += _amount;
        _mint(_to, _id, _amount, "");
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Royalty management
    uint256 private _royaltyFeeNumerator = 1000; // Represents 10% (1000 / 10000)
    address payable public superAdmin;

    function setSuperAdmin(address payable _superAdmin) public onlyOwner {
        superAdmin = _superAdmin;
    }

    function setRoyaltyFeeNumerator(uint256 _royaltyFeeNumerator) public onlyOwner {
        require(_royaltyFeeNumerator <= 10000, "Royalty fee must be less than or equal to 100%");
        _royaltyFeeNumerator = _royaltyFeeNumerator;
    }

    function getRoyaltyFeeNumerator() public view returns (uint256) {
        return _royaltyFeeNumerator;
    }

    function _transfer(address from, address to, uint256 id, uint256 value) internal override {
        uint256 royaltyAmount = (value * _royaltyFeeNumerator) / 10000;
        super._transfer(from, to, id, value - royaltyAmount);
        payable(superAdmin).transfer(royaltyAmount);
    }
}

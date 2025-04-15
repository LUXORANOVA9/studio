"// SPDX-License-Identifier: MIT
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
    uint256 public royaltyPercentage;
    address public luxoTokenAddress;
    address public superAdmin; // Address to receive royalty payments

    constructor(string memory name, string memory symbol, string memory _baseURI, address _luxoTokenAddress) ERC1155("") {
        baseURI = _baseURI;
        royaltyPercentage = 10; // 10% royalty
        luxoTokenAddress = _luxoTokenAddress;
    }

    function setSuperAdmin(address _superAdmin) public onlyOwner {
        require(_superAdmin != address(0), "SuperAdmin address cannot be zero");
        superAdmin = _superAdmin;
    }

    function mint(address account, uint256 id, uint256 amount) public onlyOwner {
        require(id >= GOLD && id <= TITANIUM, "Invalid scroll ID");
        _mint(account, id, amount, "");
    }

    function burn(address account, uint256 id, uint256 amount) public onlyOwner {
        require(id >= GOLD && id <= TITANIUM, "Invalid scroll ID");
        _burn(account, id, amount);
    }

    function uri(uint256 id) public view override returns (string memory) {
        require(id >= GOLD && id <= TITANIUM, "Invalid scroll ID");
        return string(abi.encodePacked(baseURI, Strings.toString(id), ".json"));
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    function setRoyaltyPercentage(uint256 _royaltyPercentage) public onlyOwner {
        require(_royaltyPercentage <= 100, "Royalty percentage cannot exceed 100");
        royaltyPercentage = _royaltyPercentage;
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override
    {
        require(operator == owner() || from == address(0) || to == address(0), "Only owner can transfer");
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setLuxoTokenAddress(address _luxoTokenAddress) public onlyOwner {
        require(_luxoTokenAddress != address(0), "LUXO Token address cannot be zero");
        luxoTokenAddress = _luxoTokenAddress;
    }

    function getLuxoTokenAddress() public view returns (address) {
        return luxoTokenAddress;
    }
}

"// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LuxoToken is ERC20 {
    address public minter;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        minter = msg.sender;
    }

    function mint(address to, uint256 amount) external onlyMinter {
        _mint(to, amount);
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "Only minter can call this function");
        _;
    }

    function setMinter(address newMinter) external onlyMinter {
        require(newMinter != address(0), "New minter cannot be the zero address");
        minter = newMinter;
    }
}

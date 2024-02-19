// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract AwakenToken is OFT, ERC20Permit, ERC20Votes {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        uint256 _initialSupply
    ) OFT(_name, _symbol, _lzEndpoint, _msgSender()) ERC20Permit(_name) Ownable(_msgSender()) {
        if (_initialSupply > 0) _mint(_msgSender(), _initialSupply);
    }

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }

    function nonces(address owner) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}

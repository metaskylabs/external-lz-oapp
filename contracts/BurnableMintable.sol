// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PlatformToken.sol";

interface IMintableBurnable {
    function burn(address _from, uint256 _amount) external returns (bool);
    function mint(address _to, uint256 _amount) external returns (bool);
}

contract BurnableMintable is IMintableBurnable {
    // State variables
    mapping(address => bool) private _whitelist;
    address private _owner;
    PlatformToken private _token;

    // Events
    event WhitelistUpdated(address indexed account, bool status);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == _owner, "BurnableMintable: caller is not the owner");
        _;
    }

    modifier onlyWhitelisted() {
        require(_whitelist[msg.sender], "BurnableMintable: caller is not whitelisted");
        _;
    }

    // Constructor
    constructor(address tokenAddress) {
        require(tokenAddress != address(0), "BurnableMintable: token address cannot be zero");
        _owner = msg.sender;
        _whitelist[msg.sender] = true; // Owner is whitelisted by default
        _token = PlatformToken(tokenAddress);
    }

    // Whitelist management functions
    function addToWhitelist(address account) external onlyOwner {
        _whitelist[account] = true;
        emit WhitelistUpdated(account, true);
    }

    function removeFromWhitelist(address account) external onlyOwner {
        _whitelist[account] = false;
        emit WhitelistUpdated(account, false);
    }

    function isWhitelisted(address account) external view returns (bool) {
        return _whitelist[account];
    }

    // Interface implementations
    function burn(address _from, uint256 _amount) external override onlyWhitelisted returns (bool){
        require(_from != address(0), "BurnableMintable: burn from the zero address");
        require(
            _token.balanceOf(_from) >= _amount, 
            "BurnableMintable: burn amount exceeds balance"
        );

        _token.burnFrom(_from, _amount);
        return true;
    }

    function mint(address _to, uint256 _amount) external override onlyWhitelisted returns (bool){
        require(_to != address(0), "BurnableMintable: mint to the zero address");
        
        _token.mint(_to, _amount);
        return true;
    }

    // View functions
    function getTokenAddress() external view returns (address) {
        return address(_token);
    }
}
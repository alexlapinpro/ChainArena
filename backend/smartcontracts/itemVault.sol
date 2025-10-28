// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ItemVault is Ownable {
    struct VaultItem {
        address token;
        uint256 id;
        uint256 amount;
        bool isERC1155;
    }

    mapping(bytes32 => VaultItem[]) public vaults;

    event Deposited(bytes32 indexed vaultId, address indexed user, address token, uint256 id, uint256 amount);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function depositERC721(bytes32 vaultId, address token, uint256 tokenId) external {
        IERC721(token).transferFrom(msg.sender, address(this), tokenId);
        vaults[vaultId].push(VaultItem(token, tokenId, 1, false));
        emit Deposited(vaultId, msg.sender, token, tokenId, 1);
    }

    function depositERC1155(bytes32 vaultId, address token, uint256 tokenId, uint256 amount) external {
        IERC1155(token).safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
        vaults[vaultId].push(VaultItem(token, tokenId, amount, true));
        emit Deposited(vaultId, msg.sender, token, tokenId, amount);
    }

    function getVaultItems(bytes32 vaultId) external view returns (VaultItem[] memory) {
        return vaults[vaultId];
    }

    // Required for ERC1155
    function onERC1155Received(address, address, uint256, uint256, bytes calldata) external pure returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(address, address, uint256[] calldata, uint256[] calldata, bytes calldata)
        external
        pure
        returns (bytes4)
    {
        return this.onERC1155BatchReceived.selector;
    }
}

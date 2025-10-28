// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./wrappedItemToken.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";


contract InventoryManager is Ownable {
    using ECDSA for bytes32;

    WrappedItemToken public wrappedToken;
    address public signer; 

    bytes32 public immutable DOMAIN_SEPARATOR; 
    mapping(bytes32 => bool) public usedVouchers;

    event Redeemed(address indexed user, uint256 tokenId, string uri, bytes32 voucherId);
    event SignerUpdated(address indexed newSigner);

    constructor(address initialOwner, address _wrappedToken, address _signer)
        Ownable(initialOwner)
    {
        wrappedToken = WrappedItemToken(_wrappedToken);
        signer = _signer;
        DOMAIN_SEPARATOR = keccak256(abi.encodePacked(block.chainid, address(this), "InventoryManager"));
        require(wrappedToken.owner() == initialOwner || wrappedToken.owner() == address(this), "Unexpected token owner");
    }

    function redeem(string calldata uri, bytes32 voucherId, bytes calldata signature) external {
        require(!usedVouchers[voucherId], "Voucher already used");

        bytes32 msgHash = keccak256(abi.encodePacked(msg.sender, uri, voucherId, DOMAIN_SEPARATOR));
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(msgHash);
        address recovered = ECDSA.recover(ethSignedMessageHash, signature);
        require(recovered == signer, "Invalid signature");

        usedVouchers[voucherId] = true;

        uint256 tokenId = wrappedToken.mint(msg.sender, uri);

        emit Redeemed(msg.sender, tokenId, uri, voucherId);
    }

    function setSigner(address _signer) external onlyOwner {
        signer = _signer;
        emit SignerUpdated(_signer);
    }
}

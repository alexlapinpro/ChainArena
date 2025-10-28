// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";


contract TournamentInstance is Ownable {
    using ECDSA for bytes32;

    enum State { Open, Locked, Finalized }
    State public state;

    address public signer; 
    address[] private players;
    mapping(address => bool) public registered;

    address public winner;
    bytes32 public finalizeSalt; 
    bytes32 public immutable DOMAIN_SEPARATOR;

    event Registered(address indexed player);
    event Locked();
    event Finalized(address indexed winner, bytes32 salt);
    event SignerUpdated(address indexed newSigner);

    constructor(address initialOwner, address _signer) Ownable(initialOwner) {
        signer = _signer;
        state = State.Open;
        DOMAIN_SEPARATOR = keccak256(abi.encodePacked(block.chainid, address(this), "TournamentInstance"));
    }

    function register() external {
        require(state == State.Open, "Tournament not open");
        require(!registered[msg.sender], "Already registered");
        registered[msg.sender] = true;
        players.push(msg.sender);
        emit Registered(msg.sender);
    }

    function lock() external onlyOwner {
        require(state == State.Open, "Already locked");
        state = State.Locked;
        emit Locked();
    }

    function finalize(address _winner, bytes32 salt, bytes calldata signature) external onlyOwner {
        require(state == State.Locked, "Not locked");
        require(registered[_winner], "Winner not registered");

        bytes32 msgHash = keccak256(abi.encodePacked(address(this), _winner, salt, DOMAIN_SEPARATOR));

        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(msgHash);

        address recovered = ECDSA.recover(ethSignedMessageHash, signature);
        require(recovered == signer, "Invalid signature");

        state = State.Finalized;
        winner = _winner;
        finalizeSalt = salt;
        emit Finalized(_winner, salt);
    }


    function setSigner(address _signer) external onlyOwner {
        signer = _signer;
        emit SignerUpdated(_signer);
    }

    function getPlayers() external view returns (address[] memory) {
        return players;
    }
}

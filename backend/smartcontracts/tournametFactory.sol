// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./tournamentInstance.sol";

contract TournamentFactory is Ownable {
    address[] private tournaments;

    event TournamentCreated(address indexed instance, address indexed owner, address indexed signer);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function createTournament(address tournamentOwner, address signer) external onlyOwner returns (address) {
        TournamentInstance instance = new TournamentInstance(tournamentOwner, signer);
        tournaments.push(address(instance));
        emit TournamentCreated(address(instance), tournamentOwner, signer);
        return address(instance);
    }

    function getTournaments() external view returns (address[] memory) {
        return tournaments;
    }
}

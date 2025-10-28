// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Tournament Contract for Xsolla ZK / zkSync Era
/// @author
/// @notice Управляет игровыми турнирами, участниками и выплатами
contract Tournament {


    struct Player {
        address wallet;
        bool registered;
        uint256 score;
    }

    struct TournamentInfo {
        string name;
        address creator;
        uint256 entryFee;
        uint256 prizePool;
        bool isActive;
        address winner;
        uint256 playerCount;
    }



    TournamentInfo public info;
    mapping(address => Player) public players;
    address[] public playerList;



    event TournamentCreated(string name, uint256 entryFee, address indexed creator);
    event PlayerRegistered(address indexed player);
    event TournamentEnded(address indexed winner, uint256 prize);



    constructor(string memory _name, uint256 _entryFee) {
        info = TournamentInfo({
            name: _name,
            creator: msg.sender,
            entryFee: _entryFee,
            prizePool: 0,
            isActive: true,
            winner: address(0),
            playerCount: 0
        });

        emit TournamentCreated(_name, _entryFee, msg.sender);
    }


    modifier onlyCreator() {
        require(msg.sender == info.creator, "Only creator");
        _;
    }

    modifier isActiveTournament() {
        require(info.isActive, "Tournament not active");
        _;
    }


    /// @notice Зарегистрироваться в турнире, отправив entryFee
    function register() external payable isActiveTournament {
        require(!players[msg.sender].registered, "Already registered");
        require(msg.value == info.entryFee, "Incorrect entry fee");

        players[msg.sender] = Player({
            wallet: msg.sender,
            registered: true,
            score: 0
        });

        playerList.push(msg.sender);
        info.prizePool += msg.value;
        info.playerCount++;

        emit PlayerRegistered(msg.sender);
    }

    /// @notice Установить очки игрока (только создатель турнира)
    function setPlayerScore(address player, uint256 score) external onlyCreator {
        require(players[player].registered, "Player not found");
        players[player].score = score;
    }

    /// @notice Завершить турнир и отправить приз победителю
    function endTournament(address winner) external onlyCreator {
        require(info.isActive, "Already ended");
        require(players[winner].registered, "Invalid winner");

        info.isActive = false;
        info.winner = winner;

        uint256 prize = info.prizePool;
        info.prizePool = 0;

        (bool sent, ) = payable(winner).call{value: prize}("");
        require(sent, "Prize transfer failed");

        emit TournamentEnded(winner, prize);
    }


    function getPlayers() external view returns (address[] memory) {
        return playerList;
    }

    function getTournamentInfo()
        external
        view
        returns (
            string memory name,
            address creator,
            uint256 entryFee,
            uint256 prizePool,
            bool isActive,
            address winner,
            uint256 playerCount
        )
    {
        TournamentInfo memory t = info;
        return (
            t.name,
            t.creator,
            t.entryFee,
            t.prizePool,
            t.isActive,
            t.winner,
            t.playerCount
        );
    }
}


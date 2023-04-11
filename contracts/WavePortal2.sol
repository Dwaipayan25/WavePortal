//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal2{
    uint256 totalWaves;
    address payable owner;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
        uint256 value;
    }

    Wave[] waves;

    constructor() {
        owner=payable(msg.sender);
        console.log("I am a modified waving contract");
    }

    function wave(string memory _message) public payable{
        require(msg.value >= 1 ,"send atleast 0.000001 ETH");
        totalWaves+=1;
        waves.push(Wave(msg.sender,_message,block.timestamp, msg.value));
        payable(owner).transfer(msg.value);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}

//Contract Address: 0xFCaC01B43052Ace67D37fC3cc7B13cAd87c285Dd


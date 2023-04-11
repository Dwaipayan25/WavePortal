//SPDX-License-Identifier:UNLICENSED

pragma solidity  ^0.8.0;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;
    mapping(address=>uint)public waver;

    constructor(){
        console.log("YO yO I am a smart contract");
    }
    function wave() public {
        waver[msg.sender]+=1;
        totalWaves+=1;
        console.log("%s has Waved", msg.sender);
    }
    function getTotalWaves() public view returns (uint256){
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
    function seeWaves() public view returns (uint){
        console.log("%s has %d waves", msg.sender, waver[msg.sender]);
        return waver[msg.sender];
    }
}

// Contract Address: 0x0CF4464C948B21e665571ad46C2170c43c334aC2
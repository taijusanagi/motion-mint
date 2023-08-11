// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";

contract OmnichainCredit is NonblockingLzApp {

    mapping(address=>uint16) public credit;
    mapping(address=>bool) public isNotFirstTime;

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}

    function _nonblockingLzReceive(uint16, bytes memory payload, uint64, bytes memory) internal override {
        (address sender, uint16 _usedCredit) = abi.decode(payload, (address, uint16));
        if(!isNotFirstTime[msg.sender]){
            credit[msg.sender] = 10;
            isNotFirstTime[msg.sender] = true;
        }
        credit[sender] -= _usedCredit;
    }

    function useCredit(uint16 _dstChainId, uint16 _usedCredit) public payable {
        if(!isNotFirstTime[msg.sender]){
            credit[msg.sender] = 10;
            isNotFirstTime[msg.sender] = true;
        }
        bytes memory payload = abi.encode(msg.sender, _usedCredit);
        if(_dstChainId > 0){
            _lzSend(_dstChainId, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
        } else {
            credit[msg.sender] -= _usedCredit;
        }
    }
}

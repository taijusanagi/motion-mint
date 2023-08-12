// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";

contract OmnichainCredit is NonblockingLzApp {

    mapping(address=>uint16) public used;
    mapping(address=>uint16) public depositted;

    uint16 constant public initialCredit = 10;

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}

    function getCredit(address _user) public view returns (uint16) {
        return initialCredit + depositted[_user] - used[_user];
    }

    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory payload) internal override {
        (address sender, uint16 amount) = abi.decode(payload, (address, uint16));
        uint16 credit = getCredit(sender);
        require(credit > 0, "credit is not enough");
        used[sender] += amount;
    }

    function useCredit(uint16 _dstChainId, uint16 amount) public payable {
        if(_dstChainId > 0){
            uint16 version = 1;
            uint gasForDestinationLzReceive = 350000;
            bytes memory adapterParams = abi.encodePacked(version, gasForDestinationLzReceive);
            bytes memory payload = abi.encode(msg.sender, amount);
            _lzSend(_dstChainId, payload, payable(msg.sender), address(0x0), adapterParams, msg.value);
        } else {
            uint16 credit = getCredit(msg.sender);
            require(credit > 0, "credit is not enough");
            used[msg.sender] += amount;
        }
    }

    function deposit(uint16 amount) public payable {
        // TODO: add condition
        depositted[msg.sender] += amount;
    }
}

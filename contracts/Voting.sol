// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Voting is Ownable, ERC20 {

constructor(string memory tokenName, string memory tokenSymbol, uint totalSupply) ERC20(tokenName, tokenSymbol){
_mint(msg.sender, totalSupply * (10**decimals()));
}


address public Owner;

    mapping(address => Voter) public voters;

    // Enum de sessions
    enum Step{
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied       
    }
    Step public sessionStep;

    // Voter 
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }
        
    Voter[] public votersArray;
    Proposal[] public proposals;

    // Proposal
    struct Proposal {
        string description;
        uint voteCount;
        address voter;
    }

    // Event
    event isStep(uint _step);
    event isRegistering(address _address,bool _isRegistering, bool _hasVoted, uint _votedProposalId);
    event isProposal(uint _proposalID, string _proposal);
    event isVoted(uint _proposalID,address _address);
    event isWinning(uint _proposalID, string _proposalDescription, uint _voteNumber);

    /**
    * @notice Return session step
    *
    */
    function getSessionStep() public view returns(uint){
        return uint(sessionStep);
    }

    /**
    * @notice Set sessionStep
    *
    * @param _sessionStep { RegisteringVoters(0), ProposalsRegistrationStarted(1), ProposalsRegistrationEnded(2),
        VotingSessionStarted(3), VotingSessionEnded(4), VotesTallied(5)}
    */ 
    function setSessionStep(uint _sessionStep) external onlyOwner returns(address){
        require(msg.sender==Owner,"You don't are the owner");
        sessionStep = Step(_sessionStep);
        emit isStep(_sessionStep);
        return msg.sender;
    }

    /**
    * @notice Registered whitelist
    *
    */   
    function RegisteringVoters() public {
        // Verify Voter is already registered and session is registered
        require(sessionStep==Step.RegisteringVoters,"registerVoters session has not started");
        require(!voters[msg.sender].isRegistered,"you are already registered");
        voters[msg.sender] = Voter(true, false, 0);
        emit isRegistering(msg.sender,true, false, 0);
    }

    /**
    * @notice return status registering voters
    *
    * @param _voters address voter
    */  
    function getRegisteringVoters(address _voters) public view returns(bool){
     return voters[_voters].isRegistered;
    }

    /**
    * @notice Voter proposal string description
    *
    * @param _proposal description.
    */   
    function addProposal(string memory _proposal) public{
        require(sessionStep==Step.ProposalsRegistrationStarted,"ProposalsRegistrationStarted has not started");
        require(voters[msg.sender].isRegistered, "you are note registered");
        Proposal memory proposal = Proposal(_proposal,0,msg.sender);
        proposals.push(proposal);
        emit isProposal(proposals.length,_proposal);
    }

    /**
    * @notice vote the proposal
    *
    *@param _proposalID voted proposal
    */  
    function voteProposal(uint _proposalID) public {
        require(sessionStep==Step.VotingSessionStarted,"VotingSessionStarted session has not started");
        require(voters[msg.sender].isRegistered,"you are not registered");
        require(_proposalID<=proposals.length,"proposal does not exist");
        require(!voters[msg.sender].hasVoted,"you have already voted");
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedProposalId = _proposalID;
        proposals[_proposalID].voteCount++;
        emit isVoted(_proposalID,msg.sender);

    }
    /**
    * @notice Return bool hasVoted 
    *
    */
    function getVotersHasVoted(address _address) public view returns(bool) {
        return voters[_address].hasVoted;
    }

    function getProposalPerID(uint _proposalID) public view returns(string memory){
        return proposals[_proposalID].description;
    }

    /**
    * @notice Return all proposals
    *
    */   
    function getProposalsArray() external view returns(Proposal[] memory){
        return proposals;
    }

    /**
    * @notice Return winning proposal
    *
    */ 
    function winningProposal() public onlyOwner returns(uint){
        require(sessionStep==Step.VotesTallied,"VotesTallied session has not started");
         uint winningVoteCount = 0;
         uint proposalID = 0;
         for(uint i=0; i< proposals.length; i++){
             if(proposals[i].voteCount > winningVoteCount){
                 proposalID = i;
                 winningVoteCount = proposals[i].voteCount;
             }
         }
         proposalID = 3;
         emit isWinning(proposalID, proposals[proposalID].description, proposals[proposalID].voteCount);
         return (proposalID);
    }
}
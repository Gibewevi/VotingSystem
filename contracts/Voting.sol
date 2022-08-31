// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Voting is Ownable {

address public Owner;
    constructor(){
        Owner = msg.sender;
    }

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


    function getSessionStep() public view onlyOwner returns(uint){
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
        voters[msg.sender].isRegistered = true;
        voters[msg.sender].hasVoted = false;
        // add Voter in array
        Voter memory voter = Voter(true, false, 0);
        votersArray.push(voter);
    }

    /**
    * @notice return status registering voters
    *
    */  
    function getRegisteringVoters() public view returns(bool){
     return voters[msg.sender].isRegistered;
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
    }

    function getVotersHasVoted() public view returns(bool) {
        require(sessionStep==Step.VotingSessionEnded,"VotingSession has not finished");
        require(voters[msg.sender].hasVoted, "Voters has not voted !");
        return voters[msg.sender].hasVoted;
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


    function winningProposal() public view onlyOwner returns(uint){
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
         return proposalID;
    }

}
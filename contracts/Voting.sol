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

    /**
    * @notice Set sessionStep
    *
    * @param _sessionStep { RegisteringVoters(0), ProposalsRegistrationStarted(1), ProposalsRegistrationEnded(2),
        VotingSessionStarted(3), VotingSessionEnded(4), VotesTallied(5)}
    */ 
    function setSession(uint _sessionStep) external onlyOwner returns(address){
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
        proposals[_proposalID].voteCount++;
    }
    /**
    * @notice Return all proposals
    *
    */   
    function getProposalsArray() external view returns(Proposal[] memory){
        return proposals;
    }


    function winningProposal() public view onlyOwner returns(uint _proposalID){
        require(sessionStep==Step.VotesTallied,"VotesTallied session has not started");
        uint winningVoteCount = 0;
        for(uint i=0; i<= proposals.length; i++){
            if(proposals[i].voteCount > winningVoteCount){
                _proposalID = i;
                winningVoteCount = proposals[i].voteCount;
            }
        }
    }

}
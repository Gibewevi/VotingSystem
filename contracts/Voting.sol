// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Voting is Ownable, ERC20 {
address public Owner;
uint private reward = 5 ether;
constructor(string memory tokenName, string memory tokenSymbol) ERC20(tokenName, tokenSymbol){
Owner = msg.sender;
}


    mapping(address => Voter) public voters;
    mapping(uint => Proposal) public proposalsWinning;

    // Enum de sessions
    enum Step{
        RegisteringVoters,
        ProposalsRegistration,
        VotingSession,
        VotesTallied       
    }
    Step public sessionStep;

    // Voter 
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }
        
    address[] public addressVoters;
    Proposal[] public proposals;
    uint[] public winnings;

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
    event isWinning(uint _proposalID, string _proposalDescription, uint _voteNumber, address _voter);
    event isMint(uint _amount, uint _balanceOf);
    event getWinning(uint _winningNumber,address _voter, string _lastProposal);


    /**
    * @notice reward the voter
    *
    */ 
    function rewardVote() private {
        require(!voters[msg.sender].hasVoted,"voters has already voted");
        _mint(msg.sender, reward);
        uint balance = balanceOf(msg.sender);
        emit isMint(reward, balance);
    }

    /**
    * @notice Modify reward
    *
    */ 
    function setReward(uint _amount) public onlyOwner{
        reward = _amount;
    }

    /**
    * @notice return session step
    *
    */
    function getSessionStep() public view returns(uint){
        return uint(sessionStep);
    }

    /**
    * @notice set sessionStep
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
    * @notice return all address
    *
    */  
    function getAllAddress() public view returns (address[] memory){
        return addressVoters;
    }

    /**
    * @notice reset mapping voters/proposals array
    *
    */
    function resetAllVotersMapping() internal {
        for(uint i=0 ; i<= addressVoters.length ; i++){
            voters[addressVoters[i]].isRegistered = false;
            voters[addressVoters[i]].hasVoted = false;
            voters[addressVoters[i]].votedProposalId = 0;
            addressVoters = new address[](0);
        }
            delete proposals;
    }

    /**
    * @notice registered whitelist
    *
    */   
    function RegisteringVoters() public {
        // Verify Voter is already registered and session is registered
        require(sessionStep==Step.RegisteringVoters,"registerVoters session has not started");
        require(!voters[msg.sender].isRegistered,"you are already registered");
        voters[msg.sender] = Voter(true, false, 0);
        addressVoters.push(msg.sender);
        emit isRegistering(msg.sender,true, false, 0);
    }

        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;

    /**
    * @notice return status registering voters
    *
    * @param _voters address voter
    */  
    function getRegisteringVoters(address _voters) public view returns(bool){
     return voters[_voters].isRegistered;
    }

    /**
    * @notice voter proposal string description
    *
    * @param _proposal description.
    */   
    function addProposal(string memory _proposal) public{
        require(sessionStep==Step.ProposalsRegistration,"ProposalsRegistration has not started");
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
        require(sessionStep==Step.VotingSession,"VotingSessionsession has not started");
        require(voters[msg.sender].isRegistered,"you are not registered");
        require(_proposalID<=proposals.length,"proposal does not exist");
        require(!voters[msg.sender].hasVoted,"you have already voted");
        rewardVote();
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedProposalId = _proposalID;
        proposals[_proposalID].voteCount++;
        emit isVoted(_proposalID,msg.sender);

    }
    /**
    * @notice return bool hasVoted 
    *
    */
    function getVotersHasVoted(address _address) public view returns(bool) {
        return voters[_address].hasVoted;
    }

    function getProposalPerID(uint _proposalID) public view returns(string memory){
        return proposals[_proposalID].description;
    }

    /**
    * @notice return all proposals
    *
    */   
    function getProposalsArray() external view returns(Proposal[] memory){
        return proposals;
    }


    /**
    * @notice return winning proposal and reset mapping and array
    *
    */ 
    function winningProposal() public onlyOwner{
         uint winningVoteCount = 0;
         uint proposalID = 0;
         for(uint i=0; i< proposals.length; i++){
             if(proposals[i].voteCount > winningVoteCount){
                 proposalID = i;
                 winningVoteCount = proposals[i].voteCount;
             }
         }
         winnings.push(winnings.length+1);
         proposalsWinning[winnings.length] = proposals[proposalID];
         /* reset mapping and array for the next vote */
         emit isWinning(proposalID, proposals[proposalID].description, proposals[proposalID].voteCount, proposals[proposalID].voter);
         resetAllVotersMapping();
    }

    /**
    * @notice return last proposal winning
    *
    */ 
    function getLastProposalWinning() public view returns(uint, address, string memory, uint){
        return (winnings.length, proposalsWinning[winnings.length].voter, proposalsWinning[winnings.length].description, proposalsWinning[winnings.length].voteCount);
    }

}
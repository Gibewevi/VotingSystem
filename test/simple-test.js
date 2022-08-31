const { ethers } = require('hardhat');
var chai = require('chai');
const { expect } = chai;
const BN = require('bn.js');


let owner = null;

describe("Tests Voting", function(){
  before(async function(){
    [this.owner, this.addr1, this.addr2, this.addr3,...this.addrs] = await ethers.getSigners();
  })

  it('should be to deploy smart contract', async()=>{
    this.contract = await hre.ethers.getContractFactory('Voting');
    this.deployedContract = await this.contract.deploy();
  })

  it('should be to modify the stepSession', async()=>{
    let sessionStep = await this.deployedContract.setSessionStep(0);
    expect(await this.deployedContract.getSessionStep()).to.equal(0);
  })

  it('should be to registering voters', async()=>{
    await this.deployedContract.RegisteringVoters();
    let registeredStatus = await this.deployedContract.getRegisteringVoters();
    await expect(registeredStatus).to.be.true;
  })

  it('should not be registered if already registered', async()=>{
    await expect(this.deployedContract.RegisteringVoters()).to.be.revertedWith('you are already registered');
  })


  it('should not be to add voters proposal if ProposalsRegistrationStarted is not open', async()=>{
    await expect(this.deployedContract.addProposal("solution 1")).to.be.revertedWith('ProposalsRegistrationStarted has not started');
  })

  it("should not be add proposal if address not registered", async()=>{
    // Je dois faire les tests avec un second compte
  })


  it('should not be registered if registeringVoters session not open', async()=>{
    let sessionStep = 1;
    await this.deployedContract.setSessionStep(sessionStep);
    await expect(this.deployedContract.RegisteringVoters()).to.be.revertedWith('registerVoters session has not started');
  })

  it('should be to add voters proposal', async()=>{
    await this.deployedContract.addProposal("Solution 1");
    let proposal = await this.deployedContract.getProposalPerID(0);
    expect(proposal).to.string("Solution 1");
  })


  it('should not be to vote if VotingSessionStarted is not open', async()=>{
    await expect(this.deployedContract.voteProposal(0)).to.be.revertedWith("VotingSessionStarted session has not started");
  })

  it('should be modify sessionStep has VotingSessionStarted (3)', async()=> {
    let sessionStep = 3;
    await this.deployedContract.setSessionStep(sessionStep);
    expect(await this.deployedContract.getSessionStep()).to.equal(sessionStep);
  })

  it('should not be to vote if the proposal does not exist', async()=>{
    await expect(this.deployedContract.voteProposal(3)).to.be.revertedWith("proposal does not exist");
  })

  it('should not be to vote if voters already voted', async()=>{
    await this.deployedContract.voteProposal(0);
    await expect(this.deployedContract.voteProposal(0)).to.be.revertedWith("you have already voted");
  })


  it('should be vote proposal', async()=> {
    let sessionStep = 4;
    await this.deployedContract.setSessionStep(sessionStep);
    await this.deployedContract.getVotersHasVoted()
    await expect(await this.deployedContract.getVotersHasVoted()).to.be.true;
  })

  it('should be return winning proposal', async()=>{
    let sessionStep = 5;
    await this.deployedContract.setSessionStep(sessionStep);
    let num = await this.deployedContract.winningProposal();
    // IMPOSSIBLE
  })
 

})

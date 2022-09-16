import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css'
import Header from './components/header/Header'
import LastProposalWinner from './components/panel/LastProposalWinner';
import RegisteringVoters from './components/panel/RegisteringVoters'
import ProposalsRegistration from './components/panel/ProposalsRegistration';
import VotingSession from './components/panel/VotingSession';
import VotesTallied from './components/panel/VotesTallied';
import Footer from './components/Footer';
import Contract from "../artifacts/contracts/Voting.sol/Voting.json";
import useEthersProvider from '../hooks/useEthersProvider';
import { ethers } from "ethers";

export default function Home() {

  // UseState account / provider
  const { account, provider } = useEthersProvider();
  // contract
  const contractAddress = "0x576158B9DEbc644Da47819048087d497C3382403";
  // owner
  const ownerAddress = "0xeE00566C5F3Fa4397a714667f559852c6Dd8616E";
  // stepsession
  const [sessionStep, setSessionStep] = useState(null);
  // last proposal
  const [lastProposalWinner, setLastProposalWinner] = useState(null);

  useEffect(()=>{
    // connect
    if(account) {
    //step
    checkStep();
    // data
    getDatas();
    }
  })
  

  // Step / last proposal
  const getDatas = async() => {
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
    const winner = await contract.getLastProposalWinning();
    setLastProposalWinner(winner[2]);
    let stepBN = await contract.getSessionStep();
    let step = stepBN.toNumber();
    setSessionStep(step);
  }


  // Update step
  const checkStep = async() => {
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      contract.on("isStep",(step)=>{
        let eventStep = step.toString();
        setSessionStep(eventStep);
      })
    }



  return (
    <div className={styles.container}>
      <div className='min-h-screen'>
        <Header sessionStep={sessionStep} ownerAddress={ownerAddress} contractAddress={contractAddress} lastProposalWinner={lastProposalWinner}/>
        {(() => {
        // switch step component
          switch(sessionStep) {
            case 0:
                return <RegisteringVoters contractAddress={contractAddress}/>
            case 1:
                return <ProposalsRegistration contractAddress={contractAddress}/>
            case 2:
                return <VotingSession contractAddress={contractAddress}/>
            case 3:
                return <VotesTallied contractAddress={contractAddress}/>
          }
        })()}
      </div>
      <Footer />
    </div>
  )

}

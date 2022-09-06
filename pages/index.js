import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css'
import Header from './components/header/Header'
import RegisteringVoters from './components/panel/RegisteringVoters'
import ProposalsRegistrationStarted from './components/panel/ProposalsRegistrationStarted';
import ProposalsRegistrationEnded from './components/panel/ProposalsRegistrationEnded';
import VotingStarted from './components/panel/VotingStarted';
import Footer from './components/Footer';
import Contract from "../artifacts/contracts/Voting.sol/Voting.json";
import useEthersProvider from '../hooks/useEthersProvider';
import { ethers } from "ethers";



export default function Home() {

  const { account, provider } = useEthersProvider();
  const contractAddress = "0xCE6bA66ca7f9F3ce9eee13F25ae493D4ef2de1E6";
  const ownerAddress = "0xeE00566C5F3Fa4397a714667f559852c6Dd8616E";
  const [sessionStep, setSessionStep] = useState(null);


  useEffect(()=>{
    if(account) {
    checkStep();
    getDatas();
    }
  })
  
  // Initialisation step session
  const getDatas = async() => {
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
    let stepBN = await contract.getSessionStep();
    let step = stepBN.toNumber();
    setSessionStep(step);
  }

  // Update stepSession
  const checkStep = async() => {
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      contract.on("isStep",(step)=>{
        let eventStep = step.toString();
        setSessionStep(eventStep);
      })
    }



  return (
    <div className={styles.container}>
      <div className='h-screen w-full'>
        <Header sessionStep={sessionStep} ownerAddress={ownerAddress} contractAddress={contractAddress}/>
        {(() => {
          switch(sessionStep) {
            case null:
                return <span>CHARGEMENT IMPOSSIBLE</span>
            case 0:
                return <RegisteringVoters contractAddress={contractAddress}/>
            case 1:
                return <ProposalsRegistrationStarted contractAddress={contractAddress}/>
            case 2:
                return <ProposalsRegistrationEnded />
            case 3:
                return <VotingStarted contractAddress={contractAddress}/>
            case 4:
                return <span>SESSION STEP 1</span>
             default:
               return <RegisteringVoters contractAddress={contractAddress}/>
          }
        })()}
        <Footer />
      </div>
    </div>
  )

}

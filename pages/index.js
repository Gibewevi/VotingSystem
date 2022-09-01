import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css'
import Header from './components/header/Header'
import RegisteringVoters from './components/panel/RegisteringVoters'
import ProposalsRegistrationStarted from './components/panel/ProposalsRegistrationStarted';

import Contract from "../artifacts/contracts/Voting.sol/Voting.json";
import useEthersProvider from '../hooks/useEthersProvider';
import { ethers } from "ethers";


export default function Home() {

  const { account, provider } = useEthersProvider();
  const contractAddress = "0xCE6bA66ca7f9F3ce9eee13F25ae493D4ef2de1E6";
  const [sessionStep, setSessionStep] = useState(null);


  useEffect(()=>{
    if(account) {
    console.log("connect");
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
        <Header sessionStep={sessionStep}/>
        {(() => {
          switch(sessionStep) {
            case null:
                return <span>CHARGEMENT IMPOSSIBLE</span>
            case 0:
                return <RegisteringVoters contractAddress={contractAddress}/>
            case 1:
                return <ProposalsRegistrationStarted />
            case 2:
                return <span>SESSION STEP 1</span>
            case 3:
                return <span>SESSION STEP 1</span>
            case 4:
                return <span>SESSION STEP 1</span>
             default:
               return <RegisteringVoters contractAddress={contractAddress}/>
          }
        })()}
    </div>
  )

}

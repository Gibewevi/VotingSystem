import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from './components/Header'
import RegisteringVoters from './components/panel/RegisteringVoters'
import { ethers } from "ethers";
import useEthersProvider from '../hooks/useEthersProvider';
import { useEffect, useState } from 'react';
import Contract from "../artifacts/contracts/Voting.sol/Voting.json";

export default function Home() {

  const { account, provider } = useEthersProvider();
  const contractAddress = "0x472480557178E134C90040F0BdEB5320E3DE8C0C";
  const [sessionStep,setSessionStep] = useState(0);


  useEffect(()=>{
    // ContractUpdate();
    if(account){
      getDatas();
    }
    // ContractUpdate();
  },[])
  
  const ContractUpdate =() => {
    var calc = setInterval(async()=> {
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
        let stepBN = await contract.getSessionStep();
        let step = stepBN.toNumber();
        console.log(step);
    }, 1000);
}

  const getDatas = async() => {
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
    let stepBN = await contract.getSessionStep();
    let step = stepBN.toNumber();
  }

  return (
    <div className={styles.container}>
        <Header />
        {(() => {
          switch(sessionStep) {
            case null:
                return <RegisteringVoters />
            case 0:
                return <RegisteringVoters />
            case 1:
                return <span>SESSION STEP 1</span>
            case 2:
                return <span>SESSION STEP 1</span>
            case 3:
                return <span>SESSION STEP 1</span>
            case 4:
                return <span>SESSION STEP 1</span>
             default:
               return <RegisteringVoters />
          }
        })()}
    </div>
  )

}

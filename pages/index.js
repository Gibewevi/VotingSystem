import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from './components/Header'
import Before from './components/panel/Before'
import { ethers } from "ethers";
import useEthersProvider from '../hooks/useEthersProvider';
import { useEffect } from 'react';
import Contract from "../artifacts/contracts/Voting.sol/Voting.json";

export default function Home() {

  const { account, provider } = useEthersProvider();
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  console.log(contractAddress);

  useEffect(()=>{
    if(account){
      getDatas();
    }
  })
  
  const getDatas = async() => {
  
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
    const step = await contract.getSessionStep();
    
  }

  return (
    <div className={styles.container}>
      <Header />
      <Before />
      {(()=> {
        switch(step){
          case 1: return <Before />
          case 2: return <RegisteringVoters />
        }
      })}

    </div>
  )
}

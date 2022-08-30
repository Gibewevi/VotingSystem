import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from './components/Header'
import Panel from './components/panel/panel'
import { ethers } from "ethers";
import useEthersProvider from '../hooks/useEthersProvider';


export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Panel />
    </div>
  )
}

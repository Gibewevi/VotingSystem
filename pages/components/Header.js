import ButtonMetamask from "./panel/ButtonMetamask"
import { useEffect, useState } from "react";
import useEthersProvider from "../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../artifacts/contracts/Voting.sol/Voting.json";

export default function Header(props){
    const [sessionStepName, setSessionStepName] = useState(null);
    const { account, provider } = useEthersProvider();
    const contractAddress = "0x472480557178E134C90040F0BdEB5320E3DE8C0C";
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider);

useEffect(()=>{
    setSessionStep();
},[])

    function setSessionStep(){
        var calc = setInterval(async()=> {
            const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
            let stepBN = await contract.getSessionStep();
            let step = stepBN.toNumber();
    
            if(step==0){
                setSessionStepName("RegisteringVoters")
            } else if(step==1){
                setSessionStepName("ProposalsRegistrationStarted")
            } else if(step==2){
                setSessionStepName("ProposalsRegistrationEnded")
            } else if(step==3){
                setSessionStepName("VotingSessionStarted")
            } else if(step==4){
                setSessionStepName("VotingSessionEnded")
            } else if(step==5){
                setSessionStepName("VotesTallied")
            }

            console.log(step);
        }, 1000);
    }

   

    return(
            <header className="w-full bg-zinc-900 shadow-xl">
                <div className="h-[50px] max-w-7xl mx-auto flex flex-row justify-center justify-between items-center">
                    <div className="flex flex-row justify-center items-center">
                        <div className="animate-spin mx-3 bg-white w-7 h-7 rounded-full border-[5px] border-zinc-900 border-r-cyan-400"></div>
                        <span className="text-white font-bold">STATUS : {sessionStepName}</span>
                    </div>
                    <ButtonMetamask />
                </div>
                <div className="h-[300px] bg-header-style w-full">
                    <div className="max-w-7xl mx-auto h-full flex flex-row justify-center">
                        <h1 className="flex flex-col text-center justify-center items-center">
                            <span className="font-black text-5xl text-white">BLOCKCHAIN VOTING SYSTEM</span>
                            <span className="font-lighter text-xl tracking-widest ">WEB3 DECENTRALIZED</span>
                        </h1>
                       <img src="./images/decentralized.png" className="w-[400px] h-[425px]"></img>
                    </div>
                </div>
            </header>
        )
}
import ButtonMetamask from "../panel/ButtonMetamask"
import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";

export default function Header(props){
    const [sessionStep, setSessionStep] = useState(props.sessionStep);
    useEffect(()=>{
        StepUpdate();
    })


    const StepUpdate = () => {
        if(props.sessionStep == 0){
            setSessionStep("Registering Voters");
        } else if(props.sessionStep == 1){
            setSessionStep("Proposals Registration Started");
        } else if(props.sessionStep == 2){
            setSessionStep("Proposals Registration Ended");
        } else if(props.sessionStep == 3){
            setSessionStep("Voting Session Started");
        } else if(props.sessionStep == 4){
            setSessionStep("Voting Session Ended");
        } else if(props.sessionStep == 5){
            setSessionStep("VotesTallied");
        } 
    }

    return(
            <header className="w-full bg-zinc-900 shadow-xl">
                <div className="h-[50px] max-w-7xl mx-auto flex flex-row justify-center justify-between items-center">
                    <div className="flex flex-row justify-center items-center">
                        <div className="animate-spin mx-3 bg-white w-7 h-7 rounded-full border-[5px] border-zinc-900 border-r-cyan-400"></div>
                        <span className="text-white font-bold">STATUS : {sessionStep}</span>
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
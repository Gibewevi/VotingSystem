import ButtonMetamask from "../panel/ButtonMetamask"
import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";

export default function Header(props){
    const [sessionStep, setSessionStep] = useState(props.sessionStep);
    const [ownerConnect, setOwnerConnect] = useState(null)
    const { account, provider } = useEthersProvider();
    const [balance, setBalance] = useState(null);

    useEffect(()=>{
        StepUpdate();
        if(account==props.ownerAddress){
            setOwnerConnect(true),
            balanceOf(),
            eventIsMint()
        } else if(account){
            setOwnerConnect(false),
            balanceOf(),
            eventIsMint()
        }
    })

    const winningProposal = async() => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
        const winner = await contract.winningProposal();
        console.log("winner "+winner);
    }


    const eventIsMint = async() => {
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        contract.on("isMint",(amount, balanceOf)=>{
            console.log("balance "+balanceOf);
            setBalance(balanceOf);
        })
    }

    const balanceOf = async() => {
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        const transaction = await contract.balanceOf(account);
        setBalance(transaction.toNumber());
    }

    const setStep = async(numberStep)=>{

        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
        let step = await contract.setSessionStep(numberStep);
    } 

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
                    <div className="flex flex-row justify-center items-center">
                        <button onClick={()=>winningProposal()} className="bg-orange-400">TEST</button>
                        <ButtonMetamask contractAddress={props.contractAddress}/>
                        <button className="bg-teal-400 p-1 px-2 rounded-lg font-bold text-white ml-2">{balance+" VOT"}</button>
                    </div>
                </div>
                {ownerConnect ? 
                <div className="w-full bg-subtle">
                    <div className="max-w-7xl h-[40px] mx-auto grid grid-cols-6 gap-2">
                        <button onClick={()=>setStep(0)} className="w-[150px] font-bold text-white text-center p-2">Registering</button>
                        <button onClick={()=>setStep(1)} className="w-[150px] font-bold text-white text-center p-2">Proposals Started</button>
                        <button onClick={()=>setStep(2)} className="w-[150px] font-bold text-white text-center p-2">Proposals Ended</button>
                        <button onClick={()=>setStep(3)} className="w-[150px] font-bold text-white text-center p-2">Voting Started</button>
                        <button onClick={()=>setStep(4)} className="w-[150px] font-bold text-white text-center p-2">Voting Ended</button>
                        <button onClick={()=>setStep(5)} className="w-[150px] font-bold text-white text-center p-2">Votes Tallied</button>
                    </div>
                </div>                
                : <span></span>
                }
                <div className="h-[300px] bg-header-style w-full">
                    <div className="max-w-7xl mx-auto h-full flex flex-row justify-center">
                        <h1 className="flex flex-col text-center justify-center items-center">
                            <div className="flex flex-row h-[80px] justify-center items-center">
                                <h1 className="flex flex-row justify-center items-center h-[80px]">
                                     <span className="font-black text-6xl text-slate-700 ">!</span>
                                     <span className="font-black text-6xl text-white ">VOTE</span>
                                     <span className="font-black text-7xl text-slate-700 mx-4  mb-1">IT</span>
                                </h1>
                            </div>
                            <span className="font-black text-5xl text-white">BLOCKCHAIN VOTING SYSTEM</span>
                            <span className="font-lighter text-xl tracking-widest ">WEB3 DECENTRALIZED</span>
                        </h1>
                       <img src="./images/decentralized.png" className="w-[400px] h-[425px]"></img>
                    </div>
                </div>
            </header>
        )
}
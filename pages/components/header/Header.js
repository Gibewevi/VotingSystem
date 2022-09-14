import ButtonMetamask from "../panel/ButtonMetamask"
import LastProposalWinner from "../panel/LastProposalWinner";
import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { useToast } from "@chakra-ui/react";

export default function Header(props){
    const [sessionStep, setSessionStep] = useState(props.sessionStep);
    const [ownerConnect, setOwnerConnect] = useState(null)
    const { account, provider } = useEthersProvider();
    const [balance, setBalance] = useState(null);
    const toast = useToast();
    const [viewBar, setViewBar] = useState(false);

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

    const eventIsMint = async() => {
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        contract.on("isMint",(amount, balanceOf)=>{
            // console.log("balance "+balanceOf);
        const balance = ethers.utils.formatEther(balanceOf);
        setBalance(balance);
        })
    }

    const balanceOf = async() => {
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        const transaction = await contract.balanceOf(account);
        const balance = ethers.utils.formatEther(transaction);
        console.log(balance);
        setBalance(balance);
    }

    const setStep = async(numberStep)=>{

        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
        let step = await contract.setSessionStep(numberStep);
    } 

    const setTalliedStep = async() =>{
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);

        try{
            let step = await contract.setSessionStep(3);
            await step.wait();
        } catch {
            toast({
                description: "Oops... an error occured",
                status: "error",
                duration: 4000,
                isClosable: true
            });
        }

        let winner = await contract.winningProposal();

    }


    const StepUpdate = async() => {
        if(props.sessionStep == 0){
            setSessionStep("Registering Voters");
        } else if(props.sessionStep == 1){
            setSessionStep("Proposals Registration");
        } else if(props.sessionStep == 2){
            setSessionStep("Voting Session Started");
        } else if(props.sessionStep == 3){
            setSessionStep("VotesTallied");
        } 
    }


    const ViewBar = () => {
        if(viewBar){
            setViewBar(false);
        } else if(viewBar==false){setViewBar(true)}
    }

    return(
            <header className="w-full bg-zinc-900 shadow-xl">
               <div class={`position absolute top-0 right-0 z-40 bg-slate-800 shadow-lg h-full w-[300px] ${viewBar ? 'translate-x-0':'translate-x-full'} ease-in-out duration-300`}>
                        <button onClick={() => ViewBar()} className="text-slate-900 text-sm font-bold  px-2 absolute top-0 right-0 mr-1 mt-1">X</button>
                            <div className="bg-white h-[50px] text-center flex justify-center items-center">
                                <span className="font-bold text-lg">SESSION STEP</span>
                            </div>
                            <div className="flex flex-col justify-center items-center text-white">
                                <button onClick={()=>setStep(0)} className="mt-5 tracking-widest hover:font-black">Registering</button>
                                <button onClick={()=>setStep(1)} className="mt-5 tracking-widest hover:font-black">Proposals</button>
                                <button onClick={()=>setStep(2)} className="mt-5 tracking-widest hover:font-black">Voting</button>
                                <button onClick={()=>setTalliedStep()} className="mt-5 tracking-widest hover:font-black">Tallied</button>
                            </div>
                    </div>

                <div className="h-[50px] max-w-7xl mx-auto flex flex-row justify-center justify-between items-center">
                    <div className="flex flex-row justify-center items-center">
                        <div className="animate-spin mx-3 bg-white w-7 h-7 rounded-full border-[5px] border-zinc-900 border-r-cyan-400"></div>
                        <span className="text-white font-bold">STATUS : {sessionStep}</span>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <ButtonMetamask contractAddress={props.contractAddress}/>
                        <button className="text-sm sm:text-lg bg-teal-400 p-1 px-2 rounded-lg font-bold text-white ml-2">{balance+" VOT"}</button>
                        <button className="bg-white p-1 mx-2 rounded-md">
                             <img onClick={()=>ViewBar()} src="./images/gear-fill.svg" className="z-0 w-[20px] md:w-[28px] hover:animate-spin"></img>
                        </button>
                    </div>
                </div>
                <LastProposalWinner lastProposal={props.lastProposalWinner}/>
                <div className="h-[300px] bg-header-style w-full">
                    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center items-center relative">
                            <div className="flex flex-col text-center justify-center items-center">
                                    <h1 className="flex flex-row justify-center items-center h-[80px]">
                                        <span className="text-3xl lg:text-6xl font-black text-slate-700 ">!</span>
                                        <span className="text-4xl lg:text-6xl font-black text-white ">VOTE</span>
                                        <span className="text-4xl lg:text-7xl font-black text-slate-700 mx-4  mb-1">IT</span>
                                    </h1>
                                <span className="text-2xl md:text-5xl font-black text-white">BLOCKCHAIN VOTING SYSTEM</span>
                                <span className="font-lighter text-xl tracking-widest ">WEB3 DECENTRALIZED</span>
                            </div>
                        <div className="mx-auto h-10 absolute -bottom-5 mx-auto">
                            <button className="bg-white rounded-full mx-auto shadow-md animate-bounce delay-150 duration-300">
                                <img src="./images/arrow.svg" className="w-[45px]"></img>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        )
}
import ButtonMetamask from "../panel/ButtonMetamask"
import LastProposalWinner from "../panel/LastProposalWinner";
import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { useToast } from "@chakra-ui/react";
import { gsap } from "gsap";

export default function Header(props){

    //useState step session
    const [sessionStep, setSessionStep] = useState(props.sessionStep);
    //useState connect
    const [ownerConnect, setOwnerConnect] = useState(null)
    // account / provider
    const { account, provider } = useEthersProvider();
    // balance
    const [balance, setBalance] = useState(null);
    const toast = useToast();
    // view bar
    const [viewBar, setViewBar] = useState(false);

    useEffect(()=>{
        //step session update
        StepUpdate();
        // connect owner
        if(account==props.ownerAddress){
            setOwnerConnect(true),
            balanceOf(),
            eventIsMint()
            //connect anoter account
        } else if(account){
            setOwnerConnect(false),
            balanceOf(),
            eventIsMint()
        }


    },[account])

    //event mint token
    const eventIsMint = async() => {
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        contract.on("isMint",(amount, balanceOf)=>{
            // console.log("balance "+balanceOf);
        const balance = ethers.utils.formatEther(balanceOf);
        setBalance(balance);
        })
    }

    // balance
    const balanceOf = async() => {
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        const transaction = await contract.balanceOf(account);
        const balance = ethers.utils.formatEther(transaction);
        console.log(balance);
        setBalance(balance);
    }

    // step
    const setStep = async(numberStep)=>{

        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
        let step = await contract.setSessionStep(numberStep);
    } 

    // Tallied step
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

    //step update
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

    // viewbar
    const ViewBar = () => {
        if(viewBar){
            setViewBar(false);
        } else if(viewBar==false){setViewBar(true)}
    }

    return(
            <header id="header" className="w-full h-[50px] bg-zinc-900 shadow-xl -translate-y-[50px]">
               <div className={`position absolute top-0 right-0 z-40 bg-slate-800 shadow-lg h-full w-[300px] ${viewBar ? 'translate-x-0':'translate-x-full'} ease-in-out duration-300`}>
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

                <div id="header" className="h-[50px] max-w-7xl mx-auto flex flex-row justify-center justify-between items-center">
                    <div className="flex flex-row justify-center items-center">
                        <div className="animate-spin mx-3 bg-white w-7 h-7 rounded-full border-[5px] border-zinc-900 border-r-cyan-400"></div>
                        <span className="text-white font-bold">STATUS : {sessionStep}</span>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <ButtonMetamask contractAddress={props.contractAddress}/>
                        <button id="button_2" className="text-sm sm:text-lg bg-teal-400 p-1 px-2 rounded-lg font-bold text-white ml-2 -translate-y-[50px]">{balance+" VOT"}</button>
                        <button id="button_3" className="bg-white p-1 mx-2 rounded-md -translate-y-[50px]">
                            <picture>
                                  <img onClick={()=>ViewBar()} src="./images/gear-fill.svg" alt="gear" className="z-0 w-[20px] md:w-[28px] hover:animate-spin"></img>
                            </picture>
                        </button>
                    </div>
                </div>

                <div id="lastproposal" className="bg-white w-full p-1 border border-1 border-red-400 -translate-y-[90px]">
                    <div className="max-w-7xl mx-auto">
                        <span className="font-bold text-slate-700 text-lg">Last proposal winner</span>
                        <span className="tracking-widest font-light text-teal-600 text-lg mx-2">{": "+props.lastProposal}</span>
                    </div>
                </div>

                <div id="content" className="w-full h-[800px] bg-white relative overflow-hidden flex items-center translate-y-[90px]">
                    <div id="bg-anim-0" className="mx-auto w-0 h-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-1 flex items-center justify-center">
                        <div id="overflow-text" className="w-[1000px] h-[150px] flex justify-center items-center p-3 overflow-hidden opacity-1 relative ">
                            <h1 id="text-0" className="text-center font-black text-9xl text-white opacity-0 absolute top-0 -translate-y-[120px]">BUILD</h1>
                            <h1 id="text-1" className="text-center font-black text-9xl text-white opacity-0 absolute top-0 -translate-y-[120px]">THE NEXT</h1>
                            <h1 id="text-2" className="text-center font-black text-8xl text-white opacity-1 absolute top-5 -translate-x-[900px]">SYSTEM VOTING</h1>                        
                        </div>
                    </div>
                </div>


                {/* <div className="h-[300px] bg-header-style w-full">
                    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center items-center relative">
                            <div className="flex flex-col text-center justify-center items-center">

                                    <h1 className="flex flex-row justify-center items-center h-[60px] overflow-hidden">
                                        <span id="h1-voteit"  className="text-3xl lg:text-6xl font-black text-slate-700 translate-y-[80%]">!</span>
                                        <span id="h1-voteit"  className="text-4xl lg:text-6xl font-black text-white translate-y-[80%]">VOTE</span>
                                        <span id="h1-voteit"  className="text-4xl lg:text-7xl font-black text-slate-700 mx-4 mb-1 translate-y-[80%]">IT</span>
                                    </h1>

                                    <h1 className="flex flex-row justify-center items-center h-[50px] overflow-hidden">
                                         <span id="h1-blockchain" className="text-2xl md:text-5xl font-black text-white mb-1 -translate-y-[90%]">BLOCKCHAIN VOTING SYSTEM</span>
                                    </h1>

                                <span id="span-web3" className="font-lighter text-xl tracking-widest opacity-[0%]">WEB3 DECENTRALIZED</span>
                            </div>
                        <div className="mx-auto h-10 absolute -bottom-5 mx-auto">
                            <button className="bg-white rounded-full mx-auto shadow-md animate-bounce delay-150 duration-300">
                                <picture>
                                    <img alt="arrow" src="./images/arrow.svg" className="w-[45px]"></img>
                                </picture>
                            </button>
                        </div>
                    </div>
                </div> */}
            </header>
        )
}
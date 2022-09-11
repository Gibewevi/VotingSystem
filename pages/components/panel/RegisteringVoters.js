import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { useToast } from "@chakra-ui/react";

export default function RegisteringVoters(props){
    const { account, provider } = useEthersProvider();
    const contractAddress = props.contractAddress;
    const [buttonAccount, setButtonAccount] = useState(false);
    const [buttonStatusRegistered, setButtonStatusRegistered] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const toast = useToast();

    useEffect(()=>{
        if(account){
            getIsRegister();
            eventRegistered();
            setButtonAccount(true);
        } else (setButtonAccount(false))
    })

    const getIsRegister = async() => {
        const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
        let transaction = await contract.getRegisteringVoters(account);
        setIsRegister(transaction);
        console.log("Voter register is "+transaction);
    }

    const eventRegistered = async() =>{
        // Retrieve registration events
        const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
            contract.on("isRegistering",(address,isRegistering, hasVoted, votedProposalID)=>{
            console.log('------ Event isRegistering ------');
            console.log(address);
            console.log(isRegistering);
            console.log(hasVoted);
            console.log(votedProposalID);
            console.log('------ End isRegistering ------');
            })
    }

    const RegisteringVoters = async() =>{
        // Register the voter
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);

        try {
            let transaction =  await contract.RegisteringVoters();
            await transaction.wait();
            toast({
                description: "Congratulations! You are registered.",
                status: "success",
                duration: 4000,
                isClosable: true
            });
            setIsRegister(true);
        }
        catch {
            toast({
                description: "Oops... an error occured",
                status: "error",
                duration: 4000,
                isClosable: true
            });
        }


    }
    return(
            <section className="max-w-7xl mx-auto mt-[125px] flex flex-col justify-center items-center justify-between p-5">
            {(() => {
            switch(isRegister) {
                case false:
                    return (
                        <div className="border border-slate-250 rounded-lg shadow-lg h-full w-2/3 p-5 flex flex-col">
                        <h1 className="font-bold text-4xl text-slate-800 tracking-wider">Getting Started !</h1>
                        <span className="font-semibold text-2xl text-slate-800 tracking-wider mt-8">Quick and easy.</span>
                        <div className="flex flex-col">
                          <span className="mb-2 font-lighter text-xl text-slate-800 tracking-wider mt-5">Participate in your first decentralized vote. It's quick and easy! Connect your</span>
                          <button className="bg-teal-500 p-1 px-2 rounded-lg font-bold text-white text-xl max-w-[120px]">Metamask</button>
                          <span className="font-lighter text-xl text-slate-800 tracking-wider mt-5">Sign up for the whitelist to participate in the next vote!</span>
                        </div>
    
                        <div className="mt-5">
                            {buttonAccount ? 
                            <button onClick={RegisteringVoters} className="float-right mr-3 bg-sky-500 max-w-[120px] p-2 rounded-lg font-black text-lg text-white">Registering</button>
                            :
                            <span></span>}
                        </div>
    
                    </div>                         
                        )
                case true:
                    return (
                        <div className="border border-slate-250 rounded-lg shadow-lg h-full w-2/3 p-5 flex flex-col">
                            <div className="flex flex-row">
                                 <h1 className="font-bold text-4xl text-slate-800 tracking-wider">Getting Started !</h1>
                                 <img src="./images/send.svg" className="w-8 h-8 mt-1 mx-2"></img>
                            </div>
                            <span className="font-semibold text-2xl text-slate-800 tracking-wider mt-8">Quick and easy.</span>
                        <div className="flex flex-col">
                          <span className="mb-2 font-lighter text-xl text-slate-800 tracking-wider mt-5">You are already registered for the next decentralized voting session.</span>
                          <span className="font-lighter text-xl text-slate-800 tracking-wider mb-5">Please wait, and you can make proposals!</span>
                        </div>
                    </div>                       
                        )
                case null:
                    return <span>NULL</span>
                default:
                return <span>DEFAULT</span>
            }
            })()}
                <div className="h-[150px] w-1/3"></div>
            </section>
        )
}
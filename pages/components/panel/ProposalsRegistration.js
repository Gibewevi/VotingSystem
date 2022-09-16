import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

export default function ProposalsRegistration(props){
    const { account, provider } = useEthersProvider();
    const [isRegister,setIsRegister] = useState(null);

    // proposal
    const [myProposalInput, setMyProposalInput] = useState("");
    // proposal valid button
    const [ProposalButton, setProposalButton] = useState(false);
    const toast = useToast();

    // proposal input
    function getInputValue(val){
        setMyProposalInput(val.target.value)
    }

    useEffect(()=>{
        // connect account
        if(account){
             getIsRegister();
             addProposal();
        }
    })

    // event winning
    const eventProposalWinning = async() => {
        const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
        contract.on()
    }

    // proposal
    const addProposal = async()=>{
        if(ProposalButton){
            sendProposal();
        }
    }

    // send proposal
    const sendProposal = async()=> {
            const signer = provider.getSigner();
            const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);

            try {
                let proposal =  await contract.addProposal(myProposalInput);
                await proposal.wait();
        
                toast({
                    description: "Congratulations! You are send proposal.",
                    status: "success",
                    duration: 4000,
                    isClosable: true
                });              

            }
            catch {
                toast({
                    description: "Oops... an error occured",
                    status: "error",
                    duration: 4000,
                    isClosable: true
                });
                setProposalButton(false);
            }
    }

    // verify register
    const getIsRegister = async() => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        let transaction = await contract.getRegisteringVoters(account);
        setIsRegister(transaction);
    }

    return(
            <section className="max-w-7xl mx-auto mt-[125px] flex flex-row justify-center items-center justify-between p-5">

{(() => {
            switch(isRegister) {
                case false:
                    return (
                            <div className="w-full mx-auto border border-slate-250 rounded-lg shadow-lg h-full p-5 flex flex-col transition duration-500 hover:scale-105 hover:-translate-y-6">
                                <h1 className="flex flex-row">
                                    <span className="font-bold text-4xl text-slate-800 ">Oh no ! sorry...</span>
                                    <span className=" mx-5 font-semibold text-4xl text-red-600 tracking-wide">You are not registered.</span>
                                </h1>
                                <span className="font-semibold text-2xl text-slate-800 tracking-wide mt-8">Please wait until the next registration session.</span>
                                <span className="font-semibold text-2xl text-slate-800 tracking-wide">Watch the status at the top of the page and try again.</span>

                            </div>                     
                        )
                case true:
                    return (
                        <div className="w-2/3 mx-auto border border-slate-250 rounded-lg shadow-lg h-full p-5 flex flex-col transition duration-500 hover:scale-105 hover:-translate-y-6">
                            <h1 className="flex flex-row">
                                <span className="font-bold text-4xl text-slate-800 ">Congratulations!</span>
                                <span className=" mx-5 font-semibold text-4xl text-teal-600 tracking-wide">You are registered.</span>
                            </h1>
                            <span className="font-semibold text-3xl text-slate-800 tracking-widest mt-8">Quick and easy.</span>
                            <div className="flex flex-col">
                            <span className="flex flex-row">
                                <span className="mb-2 font-lighter text-2xl text-slate-800 tracking-wider mt-5">Make your</span>
                                <span className="mb-2 font-semibold text-2xl text-slate-800 tracking-wider mt-5 mx-2">proposal</span>
                                <span className="font-lighter text-2xl text-slate-800 tracking-wider mt-5"> to go to the next step.</span>
                            </span>
                            </div>

                            <div className="p-3">
                                <input type="text" onChange={getInputValue} name="proposal" className="mt-5 border rounded-lg border-slate-300 placeholder-slate-300 w-full h-[45px] text-2xl px-4" placeholder="Your proposal"></input>
                                <button onClick={()=>setProposalButton(true)} className="mt-3 float-right bg-teal-500 p-2 rounded-lg max-w-[140px] text-white font-bold px-1">Send proposal</button>
                            </div>

                        </div>                     
                        )
            }
            })()}

            </section>
        )
}
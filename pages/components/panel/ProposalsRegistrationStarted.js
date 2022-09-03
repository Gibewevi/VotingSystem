import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

export default function ProposalsRegistrationStarted(props){
    const { account, provider } = useEthersProvider();
    const [isRegister,setIsRegister] = useState(null);
    const [myProposalInput, setMyProposalInput] = useState("");
    const [ProposalButton, setProposalButton] = useState(false);
    const toast = useToast();

    function getInputValue(val){
        setMyProposalInput(val.target.value)
    }

    useEffect(()=>{
        if(account){
             getIsRegister();
             sendProposal();
        }
    })


    const sendProposal = async()=> {
        if(ProposalButton){
            const signer = provider.getSigner();
            const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);

            try {
                let proposal =  await contract.addProposal(myProposalInput);
                await proposal.wait();
                setProposalButton(false);
                console.log("button "+ProposalButton);
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
            }
    
            contract.on("isProposal",(proposalLenght, proposal)=>{
            console.log("proposalLenght "+proposalLenght);
            console.log("proposal "+proposal);
            console.log("button "+ProposalButton);
            })
        }
    }

    const getIsRegister = async() => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        let transaction = await contract.getRegisteringVoters(account);
        setIsRegister(transaction);
    }


    // Recuperer getregistered pour afficher le message :
    // - Vous n'etes pas enregistrer/ vous etes enregistrer
    // - patientez a la prochaine session.


    return(
            <section className="max-w-7xl mx-auto mt-[125px] flex flex-row justify-center items-center justify-between p-5">

{(() => {
            switch(isRegister) {
                case false:
                    return (
                            <div className="w-full border border-slate-250 rounded-lg shadow-lg h-full p-5 flex flex-col">
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
                        <div className="w-full border border-slate-250 rounded-lg shadow-lg h-full p-5 flex flex-col">
                            <h1 className="flex flex-row">
                                <span className="font-bold text-4xl text-slate-800 ">Congratulations!</span>
                                <span className=" mx-5 font-semibold text-4xl text-teal-600 tracking-wide">You are registered.</span>
                            </h1>
                            <span className="font-bold text-2xl text-slate-800 tracking-widest mt-8">Quick and easy.</span>
                            <div className="flex flex-col">
                            <span className="flex flex-row">
                                <span className="mb-2 font-lighter text-2xl text-slate-800 tracking-wider mt-5">Make your</span>
                                <span className="mb-2 font-semibold text-2xl text-slate-800 tracking-wider mt-5 mx-2">proposal</span>
                                <span className="font-lighter text-2xl text-slate-800 tracking-wider mt-5"> to go to the next step.</span>
                            </span>
                            </div>
                                <input type="text" onChange={getInputValue} name="proposal" className="border rounded-lg border-slate-300 placeholder-slate-300 w-full h-[60px] text-3xl px-4" placeholder="Your proposal"></input>
                                <button onClick={()=>setProposalButton(true)} className="bg-red-400 p-4">Input</button>
                        </div>                     
                        )
                case null:
                    return <span>NULL</span>
                default:
                return <span>DEFAULT</span>
            }
            })()}

            </section>
        )
}
import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { render } from "react-dom";

export default function VotingSession(props){
    const { account, provider } = useEthersProvider();
    const contractAddress = props.contractAddress;
    const [proposals, setProposals] = useState([]);

    useEffect(()=>{
        if(account){
            ProposalArray();
        }
    })

    const ProposalArray = async()=>{
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        const arrayProposal = await contract.getProposalsArray();
        setProposals(arrayProposal);

    }

    const isVote = async(proposalID) => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
        const vote = await contract.voteProposal(proposalID);
        await vote.wait();
    }

    return(
        <section className="max-w-7xl mx-auto flex flex-row justify-center items-center justify-between p-5">
             <table className="auto border-separate border-spacing-x-6 border-spacing-y-3 p-2 mt-20">
                <thead>
                    <th className="p-2 bg-slate-800 rounded-lg shadow-lg text-white font-black text-xl">account</th>
                    <th className="bg-slate-800 rounded-lg shadow-lg text-white font-black text-xl">proposal</th>
                    <th className="bg-teal-600 rounded-lg shadow-lg text-white font-black text-xl">voting</th>
                </thead>
                {proposals.map((proposal,i) => (  
                <tbody>
                    <th className="border border-slate-200 shadow-md p-3">{proposal.voter}</th>
                    <th className="border border-slate-200 shadow-md p-3">{proposal.description}</th>
                    <th><button onClick={()=>isVote(i)} className="shadow-lg bg-teal-400 rounded-lg px-2 p-1 text-white transition duration-500 hover:scale-105">Vote</button></th>
                </tbody>
                 ))}
            </table>
        </section>
        )

}
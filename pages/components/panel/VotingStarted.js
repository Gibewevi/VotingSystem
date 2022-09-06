import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { render } from "react-dom";

export default function VotingStarted(props){
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

    // const data = proposals.map((proposal) => {
    //     <p key={proposal.id}>{proposal.description}</p>
    // });

    return(
        <section className="max-w-7xl mx-auto border border-slate-800 flex flex-row justify-center items-center justify-between p-5">
            <div className="grid gap-2 border border-2 border-red-400 w-1/2 p-4">
                {proposals.map((proposal) => (
                    <div className="bg-teal-200 p-1 rounded-lg shadow-md">
                        <p>{proposal.description}</p>
                    </div>
                    ))}
            </div>
        </section>
        )

}
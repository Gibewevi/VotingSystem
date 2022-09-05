import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";

export default function VotingStarted(props){
    const { account, provider } = useEthersProvider();
    const contractAddress = props.contractAddress;

    useEffect(()=>{
        if(account){
            ProposalArray();
        }
    })

    const ProposalArray = async()=>{
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        let proposals = await contract.getProposalsArray();
        console.log(proposals[1].description);
    }

    return(
        <section className="max-w-7xl mx-auto mt-[125px] flex flex-row justify-center items-center justify-between p-5">
            <div className="w-1/2 border border-slate-250 rounded-lg shadow-lg h-full p-5 flex flex-col">
                <span className="font-bold text-4xl text-slate-800 ">You can vote for your favorite proposal !</span>
            </div>
        </section>
        )
}
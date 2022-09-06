import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { render } from "react-dom";

export default function VotingStarted(props){
    const { account, provider } = useEthersProvider();
    const contractAddress = props.contractAddress;
    const [proposalsArray, setProposalsArray] = useState(null);
    const proposals = new Array([]);

    useEffect(()=>{
        if(account){
             ProposalArray();
        }
    })

    const ProposalArray = async()=>{
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        proposals = await contract.getProposalsArray();
        let proposalsLenght = proposals.length;
        setProposalsArray(proposalsLenght);
        // console.log(proposals[0].description);
    }



    return(
        <section className="max-w-7xl mx-auto mt-[125px] flex flex-row justify-center items-center justify-between p-5">
            <div className="grid gap-4 border border-2 border-red-400 w-1/2 p-4 mx-auto">
                <div>
                    {proposals.map((proposal, index)=>
                    <p key={index}>{proposal.description}</p>
                    )}
                </div>
            </div>
        </section>
        )

}
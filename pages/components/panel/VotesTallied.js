import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";

export default function VotesTallied(props){
    
    const { account, provider } = useEthersProvider();
    const contractAddress = props.contractAddress;
    const [proposalWinner, setProposalWinner] = useState(null);


    const getResult = async() =>{
        // Register the voter
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
        const proposalIDBN = await contract.winningProposal();

        contract.on("isWinning",(proposalID, proposalDescription)=>{
            const winner = proposalID.toNumber();
            setProposalWinner(winner);
            })

    }

    return(
            <section class="max-w-7xl border border-slate-800 mx-auto h-[300px] mt-[115px]">
                <div>
                    <button onClick={getResult} className="bg-orange-400 px-2 p-2 rounded-xl">Result</button>
                </div>
            </section>
        )
}
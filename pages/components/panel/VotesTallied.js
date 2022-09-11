import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { use } from "chai";

export default function VotesTallied(props){
    
    const { account, provider } = useEthersProvider();
    const contractAddress = props.contractAddress;
    const [proposalWinner, setProposalWinner] = useState();

    useEffect(()=>{
        if(account){
            getLastWinner();
        }
    })

    const getLastWinner = async() => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
        const winner = await contract.getLastProposalWinning();
        setProposalWinner(winner[1]);
    }

    return(
            <section class="max-w-7xl mx-auto h-[300px] mt-[115px]">
                <div className="max-w-4xl h-[300px] mx-auto items-center justify-center rounded-md shadow-lg border flex flex-row">
                    <div>
                        <h2 className="font-black text-center text-5xl text-teal-600">WINNER IS !</h2>
                        <h3 className="font-semibold text-center text-3xl text-teal-900 mt-5">{proposalWinner}</h3>
                    </div>
                    <div className="ml-6">
                        <img src="./images/save.svg" className="w-[100px]"></img>
                    </div>
                </div>
            </section>
        )
}
import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { use } from "chai";

export default function VotesTallied(props){
    // account / provider
    const { account, provider } = useEthersProvider();
    const contractAddress = props.contractAddress;
    
    // useState proposal/voteCount/Address
    const [proposalWinner, setProposalWinner] = useState();
    const [voteCount, setVoteCount] = useState(null);
    const [voterAddress, setVoterAddress] = useState(null);


    useEffect(()=>{
        if(account){
            // eventProposalWinning();
            getLastWinner();
        }
    })

    // event winning 
    const eventProposalWinning = async() => {
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        contract.on("isWinning",(proposalID, description, votecount, voterAddress)=>{
        // to register proposal useState
        setProposalWinner(description);
        // to register vote count useState
        setVoteCount(votecount);
        // to register address useState
        setVoterAddress(voterAddress);
        })
    }

    //last winner
    const getLastWinner = async() => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
        const winner = await contract.getLastProposalWinning();
        setProposalWinner(winner[2]);
        setVoteCount(winner[3]);
        setVoterAddress(winner[1]);
    }

    return(
            <section className="max-w-7xl mx-auto h-[300px] mt-[115px]">
                <div className="max-w-4xl h-[300px] mx-auto items-center justify-center rounded-md shadow-lg border flex flex-row">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="font-black text-center text-5xl text-teal-600">WINNER IS !</h2>
                        <h3 className="font-semibold text-center text-3xl text-teal-900 mt-5">{"''"+proposalWinner+"''"}</h3>
                        <div className="flex flew-row justify-center items-center p-2 mt-1">
                            <span className="font-semibold text-center text-xl text-orange-400">{"Vote : "+voteCount}</span>
                            <span className="font-semibold text-center text-xl text-teal-500 mx-3">{voterAddress}</span>
                        </div>
                    </div>
                    <div className="ml-6">
                        <picture>
                             <img src="./images/save.svg" alt="save" className="w-[100px]"></img>
                        </picture>
                    </div>
                </div>
            </section>
        )
}
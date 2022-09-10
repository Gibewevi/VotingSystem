import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { use } from "chai";

export default function VotesTallied(props){
    
    const { account, provider } = useEthersProvider();
    const contractAddress = props.contractAddress;


    useEffect(()=>{
        if(account){

        }
    })


    return(
            <section class="max-w-7xl border border-slate-800 mx-auto h-[300px] mt-[115px]">
                <div>

                </div>
            </section>
        )
}
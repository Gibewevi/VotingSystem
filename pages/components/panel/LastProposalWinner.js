import { useEffect, useState } from "react";

export default function lastProposalWinner(props){
    return(
            <div className="bg-white w-full p-1">
                <div className="max-w-7xl flex flex-row items-center justify-center mx-auto">
                    <span className="font-black text-slate-700 text-xl">Last proposal winner</span>
                    <span className="font-black text-teal-600 text-xl mx-2">{"' "+props.lastProposal+" '"}</span>
                </div>
            </div>
        )
}
import { useEffect, useState } from "react";

export default function lastProposalWinner(props){
    return(
            <div className="bg-white w-full p-1">
                <div className="max-w-7xl mx-auto">
                    <span className="font-bold text-slate-700 text-lg">Last proposal winner</span>
                    <span className="tracking-widest font-light text-teal-600 text-lg mx-2">{": "+props.lastProposal}</span>
                </div>
            </div>
        )
}
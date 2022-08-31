import ButtonMetamaskRegisteringVoters from "./ButtonMetamaskRegisteringVoters";
import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";

export default function RegisteringVoters(props){
    const { account, provider } = useEthersProvider();

    const RegisteringVoters = async() =>{
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
        await contract.RegisteringVoters();

        // try {
        //     let transaction = await contract.whitelistMint(account, 1, proof, overrides);
        //     setMintIsLoading(true)
        //     await transaction.wait();
        //     setMintIsLoading(false);
        //     toast({
        //         description: "Congratulations! You have minted your NFT!",
        //         status: "success",
        //         duration: 4000,
        //         isClosable: true
        //     });
        //     props.getDatas();
        // }
        // catch {
        //     toast({
        //         description: "Oops... an error occured",
        //         status: "error",
        //         duration: 4000,
        //         isClosable: true
        //     });
        // }


    }
    return(
            <section className="max-w-7xl mx-auto mt-[125px] flex flex-row justify-center items-center justify-between p-5">
                <div className="border border-slate-250 rounded-lg shadow-lg h-full w-2/3 p-5 flex flex-col">
                    <h1 className="font-bold text-5xl text-slate-800 tracking-wider">Getting Started !</h1>
                    <span className="font-semibold text-2xl text-slate-800 tracking-wider mt-8">Quick and easy.</span>
                    <div className="flex flex-col">
                      <span className="mb-2 font-lighter text-xl text-slate-800 tracking-wider mt-5">Participate in your first decentralized vote. It's quick and easy! Connect your</span>
                      <ButtonMetamaskRegisteringVoters />
                      <span className="font-lighter text-xl text-slate-800 tracking-wider mt-5">Sign up for the whitelist to participate in the next vote!</span>
                    </div>

                    <div className="flex flex-row mt-5">
                        <div className="w-3/4"></div>
                        <button onClick={RegisteringVoters}className="bg-sky-500 max-w-[120px] p-2 rounded-lg font-black text-lg text-white">Registering</button>
                    </div>

                </div>
                <div className="h-[150px] w-1/3"></div>
            </section>
        )
}
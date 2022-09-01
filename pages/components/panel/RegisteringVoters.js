import { useEffect, useState } from "react";
import useEthersProvider from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import { useToast } from "@chakra-ui/react";

export default function RegisteringVoters(props){
    const { account, provider } = useEthersProvider();
    const [buttonAccount, setButtonAccount] = useState(false);
    const [buttonStatusRegistered, setButtonStatusRegistered] = useState(false);
    const toast = useToast();

    useEffect(()=>{
        if(account){
            eventRegistered();
            setButtonAccount(true);
        } else (setButtonAccount(false))
    })

    const GetButtonStatusRegister = async() => {
    const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
    let transaction = await contract.getRegisteringVoters();
    console.log(transaction);
    }

    const eventRegistered = async() =>{
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, provider);
        contract.on("isRegistering",(address)=>{
        console.log('Event isRegistering');
        console.log(address);
        })
    }

    const RegisteringVoters = async() =>{
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);

        try {
            let transaction =  await contract.RegisteringVoters();
            await transaction.wait();
            toast({
                description: "Congratulations! You are registered.",
                status: "success",
                duration: 4000,
                isClosable: true
            });
        }
        catch {
            toast({
                description: "Oops... an error occured",
                status: "error",
                duration: 4000,
                isClosable: true
            });
        }


    }
    return(
            <section className="max-w-7xl mx-auto mt-[125px] flex flex-row justify-center items-center justify-between p-5">

                <div className="border border-slate-250 rounded-lg shadow-lg h-full w-2/3 p-5 flex flex-col">
                    <h1 className="font-bold text-5xl text-slate-800 tracking-wider">Getting Started !</h1>
                    <span className="font-semibold text-2xl text-slate-800 tracking-wider mt-8">Quick and easy.</span>
                    <div className="flex flex-col">
                      <span className="mb-2 font-lighter text-xl text-slate-800 tracking-wider mt-5">Participate in your first decentralized vote. It's quick and easy! Connect your</span>
                      <button className="bg-teal-500 p-1 px-2 rounded-lg font-bold text-white text-xl max-w-[120px]">Metamask</button>
                      <span className="font-lighter text-xl text-slate-800 tracking-wider mt-5">Sign up for the whitelist to participate in the next vote!</span>
                    </div>

                    <div className="mt-5 border border-orange-">
                        <button onClick={GetButtonStatusRegister} className="float-left bg-slate-400 max-w-[120px] p-2 rounded-lg font-black text-lg text-white">Waiting...</button>
                        {buttonAccount ? 
                        <button onClick={RegisteringVoters} className="float-right mr-3 bg-sky-500 max-w-[120px] p-2 rounded-lg font-black text-lg text-white">Registering</button>
                        :
                        <span></span>}
                    </div>

                </div>
                <div className="h-[150px] w-1/3"></div>
            </section>
        )
}
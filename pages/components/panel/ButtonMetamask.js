import React, { useState } from 'react';
import { useEffect } from 'react';
import { hasMetamask } from '../../../utils/hasMetamask';
import { useToast } from "@chakra-ui/react";
import useEthersProvider from '../../../hooks/useEthersProvider';
import { ethers } from 'ethers';

export default function ButtonMetamask(){

    const [isLoading, setIsLoading] = useState(false);
    const { account, setAccount, provider } = useEthersProvider();
    const [buttonAccount, setButtonAccount] = useState("Connect")
    const toast = useToast();

    const connectWallet = async() => {
        if(!hasMetamask()){
            toast({
                description:"Please install Metamask browser extension and retry",
                status: "error",
                duration: 4000,
                isClosable: true
            })
        }
        else{
            setIsLoading(true);
            if(provider) {
             let network = await provider.getNetwork();
                if(network.chainId !== 1) {
                    const resultAccount  = await provider.send("eth_requestAccounts", []);
                    setAccount(ethers.utils.getAddress(resultAccount[0]))
                    setIsLoading(false);
                    toast({
                        description:"Your wallet has been successfully connected!",
                        status: "success",
                        duration: 4000,
                        isClosable: true
                    })
                    setButtonAccount(resultAccount);
                }
                else{
                    setAccount(null)
                    setIsLoading(false)
                    toast({
                        description:"Please switch to Main Ethereum Network on Metamask",
                        status: "error",
                        duration: 4000,
                        isClosable: true
                    })
                }
            }
        }
    }

    return(
        <button onClick={() => connectWallet()} className="bg-white p-1 px-2 rounded-lg font-bold text-orange-800">{account ? account : "Metamask"}</button>
    )
}
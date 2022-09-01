import { useEffect, useState } from "react";

export default function ProposalsRegistrationStarted(props){

    // [isRegister,setIsRegister] = useState(null);

    // const getIsRegister = async() => {
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract(props.contractAddress, Contract.abi, signer);
    // }
    // Recuperer getregistered pour afficher le message :
    // - Vous n'etes pas enregistrer/ vous etes enregistrer
    // - patientez a la prochaine session.


    return(
            <section className="max-w-7xl mx-auto mt-[125px] flex flex-row justify-center items-center justify-between p-5">

{/* {(() => {
            switch(isRegister) {
                case false:
                    return (
                     
                        )
                case true:
                    return (
                     
                        )
                case null:
                    return <span>NULL</span>
                default:
                return <span>DEFAULT</span>
            }
            })()} */}

                    <div className="w-full border border-slate-250 rounded-lg shadow-lg h-full p-5 flex flex-col">
                        <h1 className="flex flex-row">
                            <span className="font-bold text-4xl text-slate-800 ">Congratulations!</span>
                            <span className=" mx-5 font-semibold text-4xl text-teal-600 tracking-wide">You are registered.</span>
                        </h1>
                        <span className="font-semibold text-2xl text-slate-800 tracking-widest mt-8">Quick and easy.</span>
                        <div className="flex flex-col">
                        <span className="flex flex-row">
                            <span className="mb-2 font-lighter text-xl text-slate-800 tracking-wider mt-5">Make your</span>
                            <span className="mb-2 font-semibold text-xl text-slate-800 tracking-wider mt-5 mx-2">proposal</span>
                            <span className="font-lighter text-xl text-slate-800 tracking-wider mt-5"> to go to the next step.</span>
                        </span>
                        </div>

                        <form className="w-full mt-5">
                            <input type="text" name="proposal" className="border rounded-lg border-slate-300 placeholder-slate-300 w-full h-[60px] text-3xl px-4" placeholder="Your proposal"></input>
                            <input type="submit" className="float-right mr-5 mt-5 bg-sky-500 max-w-[130px] p-2 px-3 rounded-lg font-black text-lg text-white"></input>  
                        </form>

                    </div> 
            </section>
        )
}
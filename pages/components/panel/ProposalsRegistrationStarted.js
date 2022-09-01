import { useEffect, useState } from "react";

export default function ProposalsRegistrationStarted(props){

    return(
            <section className="max-w-7xl mx-auto mt-[125px] flex flex-row justify-center items-center justify-between p-5">
                    <div className="w-full border border-slate-250 rounded-lg shadow-lg h-full p-5 flex flex-col">
                        <h1 className="font-bold text-5xl text-slate-800 tracking-widest">Congratulations!</h1>
                        <h2 className="font-lighter text-4xl text-teal-600 tracking-wide mt-2">You are registered.</h2>
                        <span className="font-semibold text-2xl text-slate-800 tracking-widest mt-8">Quick and easy.</span>
                        <div className="flex flex-col">
                        <span className="flex flex-row">
                            <span className="mb-2 font-lighter text-xl text-slate-800 tracking-wider mt-5">Make your</span>
                            <span className="mb-2 font-semibold text-xl text-slate-800 tracking-wider mt-5 mx-2">proposal</span>
                            <span className="font-lighter text-xl text-slate-800 tracking-wider mt-5"> to go to the next step.</span>
                        </span>
                        </div>

                        <form className="w-full mt-5">
                            <input type="text" name="proposal" className="border rounded-lg border-slate-300 placeholder-slate-300 w-full h-[60px] text-4xl px-4" placeholder="Your proposal"></input>
                            <input type="submit" className="float-right mr-5 mt-5 bg-sky-500 max-w-[130px] p-2 px-3 rounded-lg font-black text-lg text-white"></input>  
                        </form>

                    </div> 
            </section>
        )
}
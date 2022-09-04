import ProposalsRegistrationStarted from "./ProposalsRegistrationStarted"

export default function ProposalsRegistrationEnded(){
return(
    <section className="max-w-7xl mx-auto mt-[125px] flex flex-row justify-center items-center justify-between p-5">
        <div className="w-1/2 border border-slate-250 rounded-lg shadow-lg h-full p-5 flex flex-col">
                <span className="font-bold text-4xl text-slate-800 ">The proposal session is over !</span>
                <span className="mt-2 font-semibold text-3xl text-red-600 tracking-wide">Please wait, you will be able to vote.</span>
        </div>
    </section>
    )
}
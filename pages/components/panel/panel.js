export default function Panel(){
    return(
            <section className="max-w-7xl h-[400px] mx-auto mt-[125px] flex flex-row justify-center items-center justify-between">
                <div className="border border-slate-250 rounded-lg shadow-lg h-full w-2/3 p-5 flex flex-col">
                    <h1 className="font-bold text-5xl text-slate-800 tracking-wider">Welcome !</h1>
                    <span className="font-semibold text-xl text-slate-800 tracking-wider mt-8">Participate in your first decentralized vote. It's quick and easy! </span>
                    <span className="font-semibold text-xl text-slate-800 tracking-wider">Connect your Metamask button and sign up for the whitelist to participate in the next vote! </span>
                </div>
                <div className="h-[150px] w-1/3"></div>
            </section>
        )
}
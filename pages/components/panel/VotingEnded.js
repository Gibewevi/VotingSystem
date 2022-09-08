export default function VotingEnded(){
return(
        <section className="max-w-7xl mx-auto border border-slate-800 h-[400px] mt-20 mb-20 shadow-lg p-4 flex justify-between items-center">
            <div className="mx-5">
                <h1 className="font-bold text-5xl">Voting session is finish !</h1>
                <span className="font-light text-4xl">Please, waiting for the result.</span>
            </div>
            <img src="./images/loading.svg" className="w-[250px] mx-[200px]"></img>
        </section>
    )
}
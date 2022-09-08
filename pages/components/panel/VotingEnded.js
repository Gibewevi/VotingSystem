export default function VotingEnded(){
return(
        <section className="bg-bluecircle rounded-lg max-w-7xl mx-auto h-[400px] mt-20 mb-20 shadow-xl p-4 flex justify-between items-center">
            <div className="mx-5 w-2/3 flex flex-col">
                <h1 className="font-black text-white text-6xl">Voting session is finish !</h1>
                <span className="font-light text-4xl mt-3">Please, waiting for the result.</span>
            </div>
            <img src="./images/loading.svg" className="w-[250px] mx-[100px]"></img>
        </section>
    )
}
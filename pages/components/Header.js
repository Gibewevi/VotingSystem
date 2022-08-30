import ButtonMetamask from "./panel/ButtonMetamask"

export default function Header(){
    return(
            <header className="w-full bg-zinc-900 shadow-xl">
                <div className="h-[50px] max-w-7xl mx-auto flex flex-row justify-center justify-between items-center">
                    <div className="flex flex-row justify-center items-center">
                        <div className="animate-spin mx-3 bg-white w-7 h-7 rounded-full border-[5px] border-zinc-900 border-r-cyan-400"></div>
                        <span className="text-white font-bold">Status : RegisteredOpen</span>
                    </div>
                    <ButtonMetamask />
                </div>
                <div className="h-[300px] bg-header-style w-full">
                    <div className="max-w-7xl mx-auto h-full flex flex-row justify-center">
                        <h1 className="flex flex-col text-center justify-center items-center">
                            <span className="font-black text-5xl text-white">BLOCKCHAIN VOTING SYSTEM</span>
                            <span className="font-lighter text-xl tracking-widest ">WEB3 DECENTRALIZED</span>
                        </h1>
                       <img src="./images/decentralized.png" className="w-[400px] h-[425px]"></img>
                    </div>
                </div>
            </header>
        )
}
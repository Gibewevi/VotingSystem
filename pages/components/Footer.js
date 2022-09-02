export default function Footer(){
    return(
            <footer className="bg-zinc-900 w-full h-[80px] absolute bottom-0">
                <div className="mx-auto h-full max-w-7xl flex flex-row justify-between justify-center items-center">
                    <div className="font-semibold text-white flex flex-col mx-2">
                        <span className="text-xl font-black">!VOTE IT</span>
                         <span className="text-md tracking-widest">All rights reserved</span>
                    </div>
                    <div className="flex flex-row">
                            <img src="./images/twitter.svg" className="w-12 h-12"></img>
                            <img src="./images/instagram.svg" className="w-9 h-9 mt-1.5 mx-3"></img>
                            <img src="./images/facebook.svg" className="w-10 h-10 mt-1"></img>
                     </div>
                </div> 
            </footer>
        )
}
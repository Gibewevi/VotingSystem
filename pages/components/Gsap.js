import { useEffect } from "react"
import { gsap } from "gsap"

export default function Gsap(){
     // GSAP animation
     
     

    useEffect(()=>{
        const tl = gsap.timeline({repeat:0});
        const border = document.querySelectorAll('#bg-anim-0 #border')
        const text = document.querySelectorAll("#overflow-text h1")
        // timeline
        // .to("#h1-voteit",{y: '0%', duration:1.2},'start')
        // .to("#h1-blockchain",{y: '0%', duration:0.8}, 'start')
        // .to("#span-web3",{opacity:"100%", duration:0.5, stagger: 0.2});

        tl
        .to("#bg-anim-0",{autoAlpha:1, duration:0.5, width:"100%", height:'100%', x:0, delay:0.4})
        .to("#text-anim-0", {autoAlpha: 1, opacity:1, duration:0},'-=0.8')
        .to("#text-0",{autoAlpha:1, y:0, duration: 0.5, ease: "bounce.out"})
        .to("#text-0",{autoAlpha:1, y:125, duration: 0.2, delay:0.5})
        .to("#text-1",{autoAlpha:1, y:0, duration: 0.5, ease: "bounce.out"})
        .to("#text-1",{autoAlpha:1, y:125, duration: 0.2, delay:0.5})
        .to("#text-2",{autoAlpha:1, x:0, duration: 0.5, ease: "power4.out"})
        .to("#text-2",{autoAlpha:1, y:125, duration: 0.2, delay:0.5})
        .to("#content",{autoAlpha:1, duration:0.5, height:'300px', y:0})
        .to("#header",{autoAlpha:1, y:0, duration:0.5, y:0})
        .to("#button_1",{autoAlpha:1, y:0},'-=0.4')
        .to("#button_2",{autoAlpha:1, y:0},'-=0.2')
        .to("#button_3",{autoAlpha:1, y:0},'-=0.2')
        .to("#lastProposal", {autoAlpha:1, y:0},'-=0.2')
        .to('#decentralized', {y:0},'-=0.4')
        .to('#votingSystem', {y:0}, '<')
        .to('#underline', {autoAlpha:1, width:'66%', duration:1, ease: "power4.out"},'-=0.2')
        
    })
}
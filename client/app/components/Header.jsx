"use client"
import { useContext, useEffect } from "react"
import { HeaderStyle } from "../styles/styles"
import Image from "next/image"
import Link from "next/link"
import Logo from "../asset/logo.png"
import { appState } from "../context/store"

const Header = () => {

    const { connectWallet,  signer} = useContext(appState);
    useEffect(()=>{
        connectWallet()
    },[signer])

    return (
        <>
        <div className="flex justify-between p-6">
            <div className="flex gap-4 items-center text-xl">
            {/* <Image src = {Logo} height={50} width={50} alt=""/> */}
            <img src={Logo.src} alt="LoGo" />
            <Link href="/">Y-Earn</Link>
            </div>
             <button className={HeaderStyle.button} onClick={()=>{connectWallet}}>{signer ? `${signer.slice(0, 8)}...` : "Connect Wallet"}</button>
        </div>
        <div className=" bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-4 h-px"></div>
        
        </>
    )
}

export default Header
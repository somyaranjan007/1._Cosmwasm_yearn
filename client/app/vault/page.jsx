"use client"
import React, { useState } from "react"

const page = () => {

    const [depositdiv, setDepositdiv] = useState(true);
    const [withdrawdiv, setWithdrawdiv] = useState(false);

    return (
        <>
        <div className="flex p-4 m-4">
        <div className="basis-1/2 flex justify-between p-6 m-10">
            <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" 
            alt="" className="h-40 "/>
            <h2 className="text-6xl font-bold text-white"><span>y</span>USDC</h2>
        </div>
        <div className="basis-1/2 bg-zinc-400 rounded-md bg-opacity-20 text-center p-16">
            <h4 className="p-3">Name <span className="text-slate-300 ml-10">yUSDC</span></h4>
            <h4 className="p-3">Balance <span className="text-slate-300 ml-14">100</span></h4>
            <p className="p-4 text-neutral-500">0x27B5739e22ad9033bcBf192059122d163b60349D</p>
            
        </div>
        </div>
        <div className="flex">
            <div onClick={()=>setDepositdiv(true)}>Deposit</div>
            <div onClick={()=>setWithdrawdiv(true)}>Withdraw</div>
            {
                depositdiv && (
                    <div className="">
                    <h2>From Wallet</h2>
                    <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="h-10" alt="" />
                    <input type="text" className="bg-transparent" value="" />
                    </div>
                )
            }

        </div>
        </>
    )
}

export default page
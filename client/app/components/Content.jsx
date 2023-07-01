"use client"
import Image from "next/image"
import  { useRouter } from "next/navigation"

const Vaults = ({ handleVault }) => {
  return (
    <div onClick={handleVault}  className="flex justify-between items-center py-3 px-10 cursor-pointer hover:bg-stone-500 hover:bg-opacity-20">
    <div className="flex items-center gap-10">
      <img 
      src="https://yearn.finance/_next/image?url=https%3A%2F%2Fassets.smold.app%2Fapi%2Ftoken%2F1%2F0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48%2Flogo-128.png%3Ffallback%3Dtrue&w=48&q=75"
      className="w-9"
      alt=""
      />
      
      <p>USDC</p>
    </div>
    <div className="flex mr-20 gap-20">
      <p>100</p>
      <p>200</p>
    </div>
    </div>
  )

}


const Content = () => {

  const router = useRouter();
  const handleVault = () => {
      
        router.push("/vault");
    }

  return (
  <div className="w-full">
        <div className="  rounded mx-14 mt-10 bg-zinc-900">
              <h2 className='text-2xl font-bold p-8'>Featured Vaults</h2>
              <div className="flex justify-between py-6 px-24 text-stone-500">
                    <div className=""> Vaults</div>
                    <div className="flex gap-10 ">
                      <p>Available</p>
                      <p>Deposited</p>
                    </div>
              </div>
        {
          ["", "", "", "", "", ""].map((index)=>{
            return <Vaults handleVault={handleVault} keys={index} />
          })
        }
        </div>
    </div>
    )
}

export default Content
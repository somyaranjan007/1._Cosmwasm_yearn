import React from 'react'

const Footer = () => {
    return (


        <div >
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex items-center justify-center">

                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500">
                        <li href="/" className="text-2xl font-semibold text-gray-500 mr-4">Y-earn</li>
                        <li>
                            <a href="#" className="mr-4  ">About</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 ">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" >Contact</a>
                        </li>
                    </ul>
                </div>
                <div className=" bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-4 h-px"></div>
                <span className="block text-sm text-gray-500 text-center">© 2023 <a href="/">Yearn™</a>. All Rights Reserved.</span>
            </div>
        </div>



    )
}

export default Footer
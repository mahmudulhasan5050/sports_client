import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { firstLetterUpperCase } from '../../utils/upperLowerConvert'
import { axiosFetchFacilityUnits } from '../../axios/index'
import { useUser } from '../../context/UserContext'
import heroImage from '../../assets/home2.jpg'
import homePic from '../../assets/2.jpg'

const Home = () => {
    const navigate = useNavigate()
    const { userCTX } = useUser()
    // const [dropdownOpen, setDropdownOpen] = useState(false)
    const [facilityUnit, setFacilityUnit] = useState<any[]>([])

    useEffect(() => {
        if (userCTX?.role === 'admin') {
            navigate('/admin')
        }
        const fetchFacilityUnits = async () => {
            try {
                const response = await axiosFetchFacilityUnits()
                setFacilityUnit(response.data)
            } catch (error) {
                console.error('Error fetching facility units:', error)
            }
        }

        fetchFacilityUnits()
    }, [])

    return (
        // first
        // <div className=" bg-white flex flex-col md:flex-row md:m-0 overflow-hidden">
        //     <div className="md:w-1/2 w-full">
        //         <img src={homePic} alt="Hero" className="w-full h-full object-cover object-top" />
        //     </div>

        //     <div className="md:w-1/2 w-full">
        //         <div className="flex flex-col justify-center items-center p-8 md:p-0">
        //             {/* Text Section */}
        //             <div className="text-center flex flex-col mt-7 md:mt-32">
        //                 <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-4">Let's Play Today</h1>
        //                 <p className="text-lg md:text-xl text-gray-600 mb-8">Choose your sport to start booking.</p>
        //             </div>
        //             {/* Facility Unit Buttons */}
        //             <div className="flex flex-wrap justify-center gap-4">
        //                 {facilityUnit.length > 0 &&
        //                     facilityUnit.map((unit, index) => (
        //                         <button
        //                             key={index}
        //                             onClick={() => navigate(`/booking-client/${unit.name}`)}
        //                             className="bg-gradient-to-tl from-green-500 to-green-700 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-600 focus:outline-none transition duration-300"
        //                         >
        //                             {firstLetterUpperCase(unit.name)}
        //                         </button>
        //                     ))}
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className=" bg-white flex flex-col md:flex-row md:ml-6">
            <div className="hidden md:block md:w-1/2">
                <img src={homePic} alt="Hero" className="w-full h-full object-cover object-top rounded mt-0 md:mt-10" />
            </div>
            <div className="block md:hidden w-full">
                <img
                    src={heroImage}
                    alt="Hero"
                    className="w-full h-full object-cover object-top rounded mt-0 md:mt-10"
                />
            </div>

            <div className="md:w-1/2 w-full flex flex-col justify-center">
           
                    <div className="text-center flex flex-col mt-14 md:mt-32">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-4">Let's Play Today</h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">Choose your sport to start booking.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {facilityUnit.length > 0 &&
                            facilityUnit.map((unit, index) => (
                                <button
                                    key={index}
                                    onClick={() => navigate(`/booking-client/${unit.name}`)}
                                    className="bg-gradient-to-tl from-green-500 to-green-700 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-600 focus:outline-none transition duration-300"
                                >
                                    {firstLetterUpperCase(unit.name)}
                                </button>
                            ))}
                    </div>
                </div>
     
        </div>
        //pic is in column
        //  <div className="relative bg-white h-screen">

        //   <div className="absolute inset-0">
        //     <img
        //       src={homePic}
        //       alt="Hero"
        //       className="w-full h-full object-cover object-center"
        //     />
        //   </div>

        //   <div className="relative flex flex-col items-center justify-center h-full z-10">

        //     <div className="text-center flex flex-col mt-7 md:mt-32 bg-opacity-75 bg-white p-4 md:p-8 rounded-md shadow-lg">
        //       <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-4">
        //         Let's Play Today
        //       </h1>
        //       <p className="text-lg md:text-xl text-gray-600 mb-8">
        //         Choose your sport to start booking.
        //       </p>

        //     <div className="flex flex-wrap justify-center gap-4 mt-4">
        //       {facilityUnit.length > 0 &&
        //         facilityUnit.map((unit, index) => (
        //           <button
        //             key={index}
        //             onClick={() => navigate(`/booking-client/${unit.name}`)}
        //             className="bg-gradient-to-tl from-green-500 to-green-700 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-600 focus:outline-none transition duration-300"
        //           >
        //             {firstLetterUpperCase(unit.name)}
        //           </button>
        //         ))}
        //     </div>
        //     </div>
        //   </div>
        // </div>

        // <div className="relative">
        //     <div className="relative h-screen w-full">
        //         <img src={homePic} alt="homePic" className="absolute inset-0 w-full h-full object-cover" />
        //         <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        //     </div>

        //     <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8">
        //         <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Let's Play Today</h1>
        //         <p className="text-lg md:text-xl text-white mb-8">Choose your sport to start booking.</p>
        //         <div className="flex flex-wrap justify-center gap-4">
        //             {facilityUnit.map((unit, index) => (
        //                 <button
        //                     key={index}
        //                     onClick={() => navigate(`/booking-client/${unit.name}`)}
        //                     className="bg-gradient-to-tl from-green-500 to-green-700 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-600 focus:outline-none transition duration-300"
        //                 >
        //                     {firstLetterUpperCase(unit.name)}
        //                 </button>
        //             ))}
        //         </div>
        //     </div>
        // </div>
    )
}

export default Home

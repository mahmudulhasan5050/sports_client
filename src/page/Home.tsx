import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcSportsMode } from 'react-icons/fc'

import { firstLetterUpperCase } from '../utils/upperLowerConvert'
import { axiosFetchFacilityUnits } from '../axios/index'
import heroImage from '../assets/hero1.svg'

const Home = () => {
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [facilityUnit, setFacilityUnit] = useState<any[]>([])

    useEffect(() => {
        const fetchFacilityUnits = async () => {
            try {
                const response = await axiosFetchFacilityUnits()
                setFacilityUnit(response.data) // Assuming response.data contains the facilities
            } catch (error) {
                console.error('Error fetching facility units:', error)
            }
        }

        fetchFacilityUnits() // Call the async function
    }, [])


    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden mt-0 md:mt-0">
            {/* Left side: Hero Image */}
            <div className="md:w-1/2 w-full mt-5 h-64 md:h-auto md:mt-0">
                <img src={heroImage} alt="Hero" className="w-full h-full object-cover object-top" />
            </div>

            {/* Right side: Text and Button */}
            <div className="md:w-1/2 w-full text-center flex flex-col justify-center items-center p-8 md:p-16">
                {/* Text Section */}
                <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-4">Let's Play Today</h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                    Click the button to start booking.
                </p>

                {/* Button with Dropdown */}
                <div className="relative">
                    {!dropdownOpen && (
                        <span className="absolute inset-2 rounded-full bg-green-500 opacity-75 animate-ping"></span>
                    )}

                    <button
                        className="relative bg-gradient-to-tl from-green-100 to-green-500 rounded-full text-white h-16 w-16 overflow-hidden"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <span className="relative z-10 inline-block">
                            <FcSportsMode size={40} />
                        </span>
                    </button>

                    {dropdownOpen && facilityUnit.length !== 0 && (
                        <ul className="absolute bg-white shadow-lg rounded-md mt-2 w-48">
                            {facilityUnit.map((unit, index) => (
                                <li
                                    key={index}
                                    className="py-2 px-4 hover:bg-gray-300 cursor-pointer"
                                    onClick={() => navigate(`/booking-client/${unit.name}`)}
                                >
                                    {firstLetterUpperCase(unit.name)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home

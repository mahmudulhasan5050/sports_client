
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../context/UserContext'

interface SummaryBookingType {
    date: string
    time: string
    facilityId:string
    duration: number
    facilityName: string
    costPerHour: number
}

const SummaryBooking = ({ date, time, duration,facilityId, facilityName, costPerHour }: SummaryBookingType) => {
    const {userCTX} = useUser()
    const navigate = useNavigate()
    const totalCost = (costPerHour * duration) / 60
    const handleBooking = () => {
        const bookingData = { date, time, duration, facilityName, facilityId, costPerHour, totalCost };
        localStorage.setItem('booking', JSON.stringify(bookingData))
if(!userCTX){
    navigate('/signIn')
}
    }

    return (
        <div className="w-full flex flex-col md:w-1/2 mb-16">
            <span className="block text-gray-700 text-center text-md font-bold mb-2">Booking Summary</span>
            <div className="bg-white flex flex-col w-full px-4 py-3 md:w-1/2 text-center border border-solid border-slate-700">
                <p>
                    <strong>Facility:</strong> {facilityName}
                </p>
                <p>
                    <strong>Date:</strong> {date}
                </p>
                <p>
                    <strong>Time:</strong> {time.slice(0, 2) + ':' + time.slice(2)}
                </p>
                <p>
                    <strong>Duration:</strong> {duration} hour(s)
                </p>
                <p>
                    <strong>Total Cost:</strong> {costPerHour} euro(s)
                </p>
            </div>

            <button
                className="w-full bg-gradient-to-tl font-bold py-2 px-4 rounded shadow-md from-green-200 to-green-500 text-gray-800 hover:from-green-500 hover:to-green-200"
                onClick={handleBooking}
            >
                Confirm (<span className="text-red-500"> {totalCost} </span> euros)
            </button>
        </div>
    )
}

//export default SummaryBooking

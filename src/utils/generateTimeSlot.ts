import moment from "moment-timezone"

    // Function to generate time slots dynamically with 30-minute intervals
    export const generateTimeSlots = () => {
        const startOfDay = moment().startOf('day').add(8, 'hours') // Start at 08:00 AM
        const endOfDay = moment().startOf('day').add(23, 'hours') // End at 08:00 PM
        const timeSlots = []

        let current = startOfDay
        while (current.isBefore(endOfDay)) {
            timeSlots.push(current.format('HH:mm'))
            current = current.add(30, 'minutes') // Add 30-minute interval
        }
        return timeSlots
    }
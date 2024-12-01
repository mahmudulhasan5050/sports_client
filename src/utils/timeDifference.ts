import moment from 'moment-timezone'

//This is used for cancellation minimum time check. Here it is 12 hours
export const calculateTimeDifference = (date: string, time: string) => {
    const currentTime = moment.tz('Europe/Helsinki')

    const bookingDateTime = moment.tz(`${date.split('T')[0]} ${time}`, 'YYYY-MM-DD HH:mm', 'Europe/Helsinki')

    const timeDifference = bookingDateTime.diff(currentTime) // milliseconds
    const timeDifferenceInHours = timeDifference / (1000 * 60 * 60)

    if (timeDifferenceInHours < 12) {
        return true
    } else {
        return false
    }
}

//This is used to calculate start time is smaller than end time
export const timeDifferenceBetweenStartEnd = (start: string, end: string) => {
    const startTime = moment(start, 'HHmm')
    const endTime = moment(end, 'HHmm')
    return startTime.isBefore(endTime)
}

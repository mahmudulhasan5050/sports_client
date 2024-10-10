import moment from 'moment-timezone';

export const calculateTimeDifference = (date: string, time: string) =>{
      // Get the current date and time
      const currentTime = moment.tz('Europe/Helsinki');
     const parsedDate = moment(date, 'YYYY-MM-DD'); // Parse date as 'YYYY-MM-DD' format

     if (!parsedDate.isValid()) {
         console.error('Invalid date format:', date);
         return false;
     }
      // Get the start time of the booking
      const bookingDateTime = moment.tz(
        `${parsedDate.toISOString().split('T')[0]} ${time}`,
        'YYYY-MM-DD HH:mm',
        'Europe/Helsinki'
      );

      // Calculate the time difference in milliseconds
      const timeDifference = bookingDateTime.diff(currentTime);

      // Convert milliseconds to hours
      const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);

      if(timeDifferenceInHours < 12){
        return true
      }else{
        return false
      }
}
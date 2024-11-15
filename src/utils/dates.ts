import moment from 'moment-timezone'

export const todayToString = () => {
    return moment.tz('Europe/Helsinki').toDate()
}

// function counts next 15 days from today
export const count15DaysFromToday = () => {
    const today = moment.tz('Europe/Helsinki')
    const maxBookingDateOpenForCustomer = today.clone().add(14, 'days')
    return maxBookingDateOpenForCustomer.toDate()
}

export const todayToString1 = () =>{
    const today = new Date();
    return today.toLocaleDateString('en-CA');
}

// function counts next 15 days from today
export const count15DaysFromToday1 = () =>{
  const today = new Date();
  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 15); // 15 days from today
  return maxDateObj.toISOString().split('T')[0]; // Max date
}
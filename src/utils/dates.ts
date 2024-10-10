export const todayToString = () =>{
    const today = new Date();
    return today.toLocaleDateString('en-CA');
}

// function counts next 15 days from today
export const count15DaysFromToday = () =>{
  const today = new Date();
  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 15); // 15 days from today
  return maxDateObj.toISOString().split('T')[0]; // Max date
}
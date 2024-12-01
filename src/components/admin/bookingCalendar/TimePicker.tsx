type TimePickerProps = {
    idAndName: string
    label: string
    value: string; 
    handleFormChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const generateTimeOptions = () => {
    const times = [];
    for (let hour = 7; hour < 24; hour++) {
        for (let min = 0; min < 60; min += 30) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMin = min.toString().padStart(2, '0');
            times.push(`${formattedHour}:${formattedMin}`);
        }
    }
    return times;
};

const TimePicker = ({label,idAndName, value, handleFormChange }: TimePickerProps) => {
    const timeOptions = generateTimeOptions();

    return (
        <div>
            <label htmlFor={idAndName} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={idAndName}
                name={idAndName}
                value={value}
                onChange={handleFormChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
                {timeOptions.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimePicker
export const findMissingDates = (dates: string[]): string[] => {
    // Convert date strings to Date objects for easier comparison
    const dateObjects = dates.map(dateStr => new Date(dateStr).getTime()); // Extract timestamp with getTime()

    // Find the first and last dates
    const minDate = new Date(Math.min(...dateObjects)); // Use Math.min with timestamps
    const maxDate = new Date(Math.max(...dateObjects)); // Use Math.max with timestamps

    // Array to store missing dates
    const missingDates: string[] = [];

    // Iterate through the range of dates between minDate and maxDate
    for (let currentDate = new Date(minDate); currentDate <= maxDate; currentDate.setDate(currentDate.getDate() + 1)) {
        const currentDateStr: string = currentDate.toISOString().split('T')[0]; // Format currentDate as YYYY-MM-DD
        if (!dates.includes(currentDateStr)) {
            missingDates.push(currentDateStr);
        }
    }

    return missingDates;
};
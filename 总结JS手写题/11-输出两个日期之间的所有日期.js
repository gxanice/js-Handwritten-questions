function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

const startDate = new Date('2023-01-01');
const endDate = new Date('2023-01-10');
const allDates = getDatesBetween(startDate, endDate);

console.log(allDates);

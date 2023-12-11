export default {
    namespaced: true,
    state: {

    },
    mutations: {

    },
    getters: {
        getCurrentDate: () => {
            const months = [
                "January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"
            ];

            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = months[currentDate.getMonth()];
            const year = currentDate.getFullYear();

            // Adding leading zero to the day if it's a single digit
            const formattedDay = (day < 10) ? `0${day}` : day;

            // Formatted date string
            return `${formattedDay} ${month} ${year}`;
        }
    },
    actions: {

    }
}

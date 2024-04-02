class DatePicker {
    constructor(elementId) {
        this.datePickerElement = document.getElementById(elementId);
        this.selectedDate = new Date();

        this.renderDatePicker();
        this.addEventListeners();
    }

    renderDatePicker() {
        const datePickerWrapper = document.createElement('div');
        datePickerWrapper.classList.add('date-picker');

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = this.formatDate(this.selectedDate);

        const calendarIcon = document.createElement('i');
        calendarIcon.classList.add('fa', 'fa-calendar');

        datePickerWrapper.appendChild(inputField);
        datePickerWrapper.appendChild(calendarIcon);

        this.datePickerElement.appendChild(datePickerWrapper);
    }

    addEventListeners() {
        const inputField = this.datePickerElement.querySelector('input');
        inputField.addEventListener('click', () => {
            this.showDatePicker();
        });
    }

    showDatePicker() {
        // Logic to display the date picker UI and handle date selection
        console.log('Date picker opened');
    }

    formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

const datePicker = new DatePicker('date-picker-container');

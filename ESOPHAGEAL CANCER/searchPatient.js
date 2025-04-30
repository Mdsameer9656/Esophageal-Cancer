// Function to fetch and display patients immediately when the page loads
async function fetchAndDisplayPatientsOnLoad() {
    console.log('Hello Before');
    try {
        const response = await fetch('/api/patients');
        if (!response.ok) {
            throw new Error('Failed to fetch patients');
        }
        const patients = await response.json();
        displayPatients(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

// Function to handle form submission
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/patients')
        .then(response => response.json())
        .then(patients => {
            const tableBody = document.querySelector('#patients-table tbody');
            patients.forEach(patient => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${patient.Barcode}</td>
                    <td>${patient.UUID}</td>
                    <td>${patient.Country}</td>
                    <td>${patient.Gender}</td>
                    <td>${patient.Height}</td>
                    <td>${patient.Weight}</td>
                    <td>${patient.SmokingHistory}</td>
                    <td>${patient.AlcoholHistory}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching patients:', error));
});


// Function to display fetched patients in the HTML table
function displayPatients(patients) {
    const tableBody = document.querySelector('.table-container table tbody');
    tableBody.innerHTML = ''; // Clear existing table rows

    // Iterate over each patient and create table rows
    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.patient_barcode}</td>
            <td>${patient.bcr_patient_uuid}</td>
            <td>${patient.country_of_birth}</td>
            <td>${patient.gender}</td>
            <td>${patient.height}</td>
            <td>${patient.weight}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Call fetchAndDisplayPatientsOnLoad when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayPatientsOnLoad);


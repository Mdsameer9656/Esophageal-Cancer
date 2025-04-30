const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3600;

// MySQL connection configuration
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbms_project',
    connectionLimit: 10
});

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
    connection.release();
});

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'patientForm.html'));
});

// Handle form submissions for patient data
app.post('/submitPatient', (req, res) => {
    const {
        patient_barcode,
        bcr_patient_uuid,
        informed_consent_verified,
        days_to_birth,
        country_of_birth,
        gender,
        height,
        weight,
        tobacco_smoking_history,
        age_began_smoking_in_years,
        stopped_smoking_year,
        number_pack_years_smoked,
        alcohol_history_documented,
        frequency_of_alcohol_consumption,
        amount_of_alcohol_consumption_per_day,
        reflux_history,
    } = req.body;

    // Prepare SQL query
    const sql = `
        INSERT INTO Patients (
            patient_barcode, bcr_patient_uuid, informed_consent_verified, days_to_birth,
            country_of_birth, gender, height, weight, tobacco_smoking_history,
            age_began_smoking_in_years, stopped_smoking_year, number_pack_years_smoked,
            alcohol_history_documented, frequency_of_alcohol_consumption, amount_of_alcohol_consumption_per_day,
            reflux_history
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        patient_barcode,
        bcr_patient_uuid,
        informed_consent_verified,
        days_to_birth,
        country_of_birth,
        gender,
        height,
        weight,
        tobacco_smoking_history,
        age_began_smoking_in_years,
        stopped_smoking_year,
        number_pack_years_smoked,
        alcohol_history_documented,
        frequency_of_alcohol_consumption,
        amount_of_alcohol_consumption_per_day,
        reflux_history,
    ];

    // Execute SQL query
    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error inserting data into Patients table:', error);
            return res.status(500).send('Error inserting data into Patients table');
        }
        console.log('Data inserted into Patients table successfully');
        res.status(200).send('Patient data submitted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

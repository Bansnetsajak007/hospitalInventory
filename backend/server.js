//VOLI HERNU PARXAA
//GARNE VANASI GARNE HOOOOO 
//LA AAILEY CHAI SUTAYA


const Patient = require('./mode.js');
require('dotenv').config(); 

const express = require('express'); 
const mysql = require('mysql2'); 
const cors = require('cors');    

const app = express();    
const DBconncetion = require('./db.js');       
const port = process.env.PORT || 5000; 

app.use(cors());                
app.use(express.json());       

const db = mysql.createConnection(
  'mysql://root:sktyxEdSiAFLXVkpPTHbnFmkNepzVroi@junction.proxy.rlwy.net:52783/railway'
);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/api/appointments', async (req, res) => {
  try {
    const {name, gender, dob, email, phone, address, preferredDoctor, purpose} = req.body;
    const lastAppointment = await Patient.findOne().sort({ count: -1 });
    const newCount = lastAppointment ? lastAppointment.count + 1 : 1;

    const newAppointment = new Patient({
      PatientName: name,
      gender,
      dob,
      email,
      phone,
      address,
      preferredDoctor,
      purpose,
      count: newCount // This assumes newCount is defined in your scope
    });
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment saved successfully', id: newCount });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ error: 'Error saving appointment' });
  }
});

app.get('/api/getAppoipments', async (req, res) => {
  try {
    // Fetch all appointments (patients) from the database
    const appointments = await Patient.find();

    // Respond with the list of appointments
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});


DBconncetion().then(() => {
  app.listen(port, () => {
      console.log(`Server running at port ${port}`);
      console.log("listening for requests");
  })
})

import { useState, useEffect } from 'react';
import axios from 'axios';

function Queue() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const apiUrl = 'https://hospitalinventory.onrender.com'; 
      const response = await axios.get(`${apiUrl}/api/getAppoipments`);
      console.log(response.data);

      if (response.data.length) {
        setAppointments(response.data);
      } else {
        console.log("No appointments found in the database.");
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white shadow-lg rounded-lg p-6'>
        <h2 className='text-2xl font-bold mb-4'>Appointments List</h2>
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr>
              <th className='border border-gray-300 p-2'>ID</th>
              <th className='border border-gray-300 p-2'>Name</th>
              <th className='border border-gray-300 p-2'>Date</th>
              <th className='border border-gray-300 p-2'>Doctor</th>
              <th className='border border-gray-300 p-2'>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className='border border-gray-300 p-2'>{appointment.count}</td>
                <td className='border border-gray-300 p-2'>{appointment.PatientName}</td>
                <td className='border border-gray-300 p-2'>{new Date(appointment.dob).toLocaleDateString()}</td>
                <td className='border border-gray-300 p-2'>{appointment.preferredDoctor}</td>
                <td className='border border-gray-300 p-2'>{appointment.status || 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Queue;

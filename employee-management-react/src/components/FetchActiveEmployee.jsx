import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

const FetchActiveEmployee = () => {
  const [activeEmployees, setActiveEmployees] = useState([]);

  const fetchActiveEmployees = () => {
    EmployeeService.getActiveEmployees()
      .then((response) => {
        setActiveEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inactivateEmployee = (employeeId) => {
    EmployeeService.inactivateEmployee(employeeId)
      .then((response) => {
        fetchActiveEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchActiveEmployees();
  }, []);

  return (
    <div className='container'>
      <h2 className='text-center'>List of Active Employees</h2>
      <Link to='/employees' className='btn btn-danger'>Go Back</Link>
      <br/><br/>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Date of Join</th>
            <th>Department</th>
            <th>Contact No</th>
            <th>Email ID</th>
            <th>Highest Qualification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeEmployees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{`${employee.firstName} ${employee.lastName}`}</td>
              <td>{employee.dateOfJoin}</td>
              <td>{employee.department}</td>
              <td>{employee.contactNo}</td>
              <td>{employee.emailId}</td>
              <td>
                {employee.educationDetails && employee.educationDetails.length > 0
                  ? employee.educationDetails[0].qualification
                  : "No Qualification"}
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => inactivateEmployee(employee.employeeId)}
                >
                  Inactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchActiveEmployee;

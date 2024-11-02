import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);

  const getAllEmployee = () =>{
    EmployeeService.getAllEmployee()
    .then((response) => {
      setEmployees(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    getAllEmployee();
  }, []);

  const deleteEmployee = (employeeId) =>{
    console.log(employeeId);
    EmployeeService.deleteEmployee(employeeId).then((response)=>{
     getAllEmployee();
    }).catch(error=>{
      console.log(error);
    })
  }



  return (
    <div className='container'>
      <h2 className='text-center'>List of Employees</h2>
      <Link to='/add-employee' className='btn btn-primary mb-2'>Add Employee</Link>
      <Link to='/fetch-active-Emplyee' className='btn btn-primary mb-2'>Active Status</Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>EmployeeId</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>DateOfJoin</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Experience</th>
            <th>Address</th>
            <th>EducationDetails</th>
            <th>ContactNo</th>
            <th>EmailId</th>
            <th>ActiveStatus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.dateOfJoin}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>{employee.experience ? 'Yes' : 'No'}</td>
              <td>
                <div>Permanent: {employee.address?.permanentAddress}</div>
                <div>Present: {employee.address?.presentAddress}</div>
              </td>
              <td>
                {employee.educationDetails && employee.educationDetails.length > 0 ? (
                  <ul>
                    {employee.educationDetails.map((education, index) => (
                      <li key={index}>
                        {education.qualification} - {education.universityCollege} ({education.completionYear}), Score: {education.percentage}%
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No Education Details"
                )}
              </td>
              <td>{employee.contactNo}</td>
              <td>{employee.emailId}</td>
              <td>{employee.activeStatus ? 'Active' : 'Inactive'}</td>
              <td>
              <Link className='btn btn-info' to={`/edit-employee/${employee.employeeId}`}>Update</Link>
              <button className='btn btn-danger' onClick={()=>deleteEmployee(employee.employeeId)}
                style={{marginLeft:"10px"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;

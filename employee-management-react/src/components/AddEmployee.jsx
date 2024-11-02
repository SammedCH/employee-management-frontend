import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

const AddEmployee = () => {
    const [employeeId, setEmployeeId] = useState(null); // For display in update mode
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfJoin, setDateOfJoin] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [experience, setExperience] = useState(''); // Yes/No dropdown
    const [address, setAddress] = useState({
        permanentAddress: '',
        presentAddress: ''
    });
    const [educationDetails, setEducationDetails] = useState([
        { qualification: '', universityCollege: '', percentage: '', completionYear: '' }
    ]);
    const [contactNo, setContactNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [activeStatus, setActiveStatus] = useState(''); // Active/Inactive dropdown

    const navigate = useNavigate();
    const { id } = useParams();

    
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault(); // Prevent form refresh
        const employee = {
            firstName, lastName, dateOfJoin, department, salary,
            experience, address, educationDetails, contactNo,
            emailId, activeStatus,
        };
    
        if(id){
           EmployeeService.updateEmployee(id,employee).then((response)=>{
            navigate('/employees');
           }).catch(error=>{
            console.log(error);
           })
        }else{
            EmployeeService.createEmployee(employee)
            .then((response) => {
                console.log(response.data);
                navigate('/employees');
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
    };

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id).then((response) => {
                const employee = response.data;
                setEmployeeId(employee.employeeId);
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setDateOfJoin(employee.dateOfJoin);
                setDepartment(employee.department);
                setSalary(employee.salary);
                setExperience(employee.experience ? 'true' : 'false');
                setAddress({
                    permanentAddress: employee.address.permanentAddress,
                    presentAddress: employee.address.presentAddress
                });
                setEducationDetails(employee.educationDetails);
                setContactNo(employee.contactNo);
                setEmailId(employee.emailId);
                setActiveStatus(employee.activeStatus ? 'true' : 'false');
            }).catch((error) => {
                console.error("Error fetching employee data:", error);
            });
        }
    }, [id]);
    
    

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleEducationDetailChange = (index, field, value) => {
        const newEducationDetails = [...educationDetails];
        newEducationDetails[index][field] = value;
        setEducationDetails(newEducationDetails);
    };

    const addEducationDetail = () => {
        setEducationDetails([
            ...educationDetails,
            { qualification: '', universityCollege: '', percentage: '', completionYear: '' }
        ]);
    };

    const title = () =>{
        if(id){
            <h2 className='text-center'>Update Employee</h2>
        }else{
            <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-8 offset-md-2'>
                        { title()}
                        <div className='card-body'>
                            <form>
                                {employeeId && (
                                    <div className='form-group mb-2'>
                                        <label className='form-label'>Employee ID</label>
                                        <input type='text' className='form-control' value={employeeId} readOnly />
                                    </div>
                                )}

                                <div className='form-group mb-2'>
                                    <label className='form-label'>First Name *</label>
                                    <input
                                        type='text'
                                        placeholder='Enter First Name'
                                        className='form-control'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Name *</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Last Name'
                                        className='form-control'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Date of Join *</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        value={dateOfJoin}
                                        onChange={(e) => setDateOfJoin(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Department *</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Department'
                                        className='form-control'
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Salary</label>
                                    <input
                                        type='number'
                                        placeholder='Enter Salary'
                                        className='form-control'
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Experience *</label>
                                    <select
                                        className='form-control'
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    >
                                        <option value=''>Select Experience</option>
                                        <option value='true'>Yes</option>
                                        <option value='false'>No</option>
                                    </select>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Permanent Address *</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Permanent Address'
                                        className='form-control'
                                        name='permanentAddress'
                                        value={address.permanentAddress}
                                        onChange={handleAddressChange}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Present Address *</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Present Address'
                                        className='form-control'
                                        name='presentAddress'
                                        value={address.presentAddress}
                                        onChange={handleAddressChange}
                                    />
                                </div>

                                {educationDetails.map((education, index) => (
                                    <div key={index} className='education-detail mb-3'>
                                        <h5>Education Detail {index + 1}</h5>
                                        <input
                                            type='text'
                                            placeholder='Qualification'
                                            className='form-control mb-2'
                                            value={education.qualification}
                                            onChange={(e) => handleEducationDetailChange(index, 'qualification', e.target.value)}
                                        />
                                        <input
                                            type='text'
                                            placeholder='University/College'
                                            className='form-control mb-2'
                                            value={education.universityCollege}
                                            onChange={(e) => handleEducationDetailChange(index, 'universityCollege', e.target.value)}
                                        />
                                        <input
                                            type='number'
                                            placeholder='Percentage'
                                            className='form-control mb-2'
                                            value={education.percentage}
                                            onChange={(e) => handleEducationDetailChange(index, 'percentage', e.target.value)}
                                        />
                                        <input
                                            type='number'
                                            placeholder='Completion Year'
                                            className='form-control mb-2'
                                            value={education.completionYear}
                                            onChange={(e) => handleEducationDetailChange(index, 'completionYear', e.target.value)}
                                        />
                                    </div>
                                ))}

                                <button type='button' className='btn btn-secondary mb-3' onClick={addEducationDetail}>
                                    Add Education Detail
                                </button>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Contact No *</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Contact Number'
                                        className='form-control'
                                        value={contactNo}
                                        onChange={(e) => setContactNo(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Email ID *</label>
                                    <input
                                        type='email'
                                        placeholder='Enter Email ID'
                                        className='form-control'
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Active Status *</label>
                                    <select
                                        className='form-control'
                                        value={activeStatus}
                                        onChange={(e) => setActiveStatus(e.target.value)}
                                    >
                                        <option value=''>Select Status</option>
                                        <option value='true'>Active</option>
                                        <option value='false'>Inactive</option>
                                    </select>
                                </div>
                                <button type="button" className="btn btn-success" onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                                <Link to='/employees' className='btn btn-danger'>Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;

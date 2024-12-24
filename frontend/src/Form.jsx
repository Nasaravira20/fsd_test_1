import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const [log,setlog] = useState('');
  const [isEditing,setIsEditing] = useState(false);
  // const [submitted, setsubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    employee_id:'',
    email: '',
    number: '',
    department: '',
    dateOfJoining: '',
    role: ''
  });
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    employee_id: false,
    email: false,
    number: false,
    department: false,
    dateOfJoining: false,
    role: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    
      console.log('employee not found')
      const localData = JSON.parse(localStorage.getItem("employeeData"));
      
      // console.log(localData);
      if (localData) {
        // const localData = Data[0];
        // setFormData(JSON.parse(localData));
        setFormData({
          firstname: localData.firstname || "",
          lastname: localData.lastname || "",
          employee_id: localData.employee_id || "",
          email: localData.email || "",
          number: localData.phone_number || "",
          department: localData.department || "",
          dateOfJoining: localData.dateOfJoining || "",
          role: localData.role || "",
        });
        console.log(localData);
        setIsEditing(true);
    }else { console.log('no data found')}
  
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'firstname') {
      setFormData({
        ...formData,
        [name]: value.charAt(0).toUpperCase() + value.slice(1),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formData.firstname) {
      validationErrors.firstname = 'First Name is required.';
    }

    if (!formData.lastname) {
      validationErrors.lastname = 'Last Name is required.';
    }

    if (!/^\S{10}$/.test(formData.employee_id)) {
      validationErrors.employee_id = 'Valid 10-char empid is required is required.';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Valid Email is required.';
    }

    if (!/^\d{10}$/.test(formData.number)) {
      validationErrors.number = 'Valid 10-digit phone number is required.';
    }

    if (!formData.department) {
      validationErrors.department = 'Department is required.';
    }

    if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date()) {
      validationErrors.dateOfJoining = 'Valid Date of Joining is required.';
    }
    if (!formData.role) {
      validationErrors.role = 'Role is required.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        if (isEditing)
        {
          const response = await axios.put('http://localhost:3000/api/employee/update', formData);
          
          console.log(response);
          alert('employee updated successfully');
          if (response.status === 200) {
            localStorage.clear();
            navigate('/')
          }
        }else{
          const response = await axios.post('http://localhost:3000/api/employee/add', formData);
          
          console.log('Employee added to the database successfully', response);
          alert('Employee added to the database successfully');
          if (response.status === 201) {
            // localStorage.clear();
            navigate('/')
          }
        }
        
        setFormData({
          firstname: '',
          lastname: '',
          employee_id: '',
          email: '',
          number: '',
          department: '',
          dateOfJoining: '',
          role: ''
        });
        setErrors({});
      } catch (error) {
        console.log(error.response.data.user);
        alert(error.response.data.msg);
        // setlog(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setlog('');
    setFormData({
      firstname: '',
      lastname: '',
      employee_id: '',
      email: '',
      number: '',
      department: '',
      dateOfJoining: '',
      role: ''
    });
    setErrors({});
  };

  return (
    <main>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p>{log}</p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an employee
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className={`bg-gray-50 border ${errors.firstname ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="John"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                  {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
                </div>

                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className={`bg-gray-50 border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="Doe"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                  {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
                </div>

                <div>
                  <label
                    htmlFor="empid"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employee_id"
                    id="empid"
                    className={`bg-gray-50 border ${errors.employee_id ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="employee85"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                  />
                  {errors.employee_id && <p className="text-red-500 text-xs mt-1">{errors.employee_id}</p>}
                </div>

                <div>
                  {!isEditing && 
                  <>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </>
                }
                </div>

                <div>
                  <label
                    htmlFor="number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <div className="flex">
                    
                    <input
                      type="tel"
                      name="number"
                      id="number"
                      className={`bg-gray-50 border ${errors.number ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder="8520741046"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>            {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department
                  </label>
                  <select
                    name="department"
                    id="department"
                    className={`bg-gray-50 border ${errors.department ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="hr">HR</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="finance">Finance</option>
                  </select>
                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>

                <div>
                  <label
                    htmlFor="dateOfJoining"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date of Joining
                  </label>
                  <input
                    type="date"
                    name="dateOfJoining"
                    id="dateOfJoining"
                    className={`bg-gray-50 border ${errors.dateOfJoining ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    max={new Date().toISOString().split("T")[0]}
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    required
                  />
                  {errors.dateOfJoining && <p className="text-red-500 text-xs mt-1">{errors.dateOfJoining}</p>}
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    name="role"
                    id="role"
                    className={`bg-gray-50 border ${errors.role ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="developer">Developer</option>
                    <option value="manager">Manager</option>
                    <option value="analyst">Analyst</option>
                    <option value="designer">Designer</option>
                  </select>
                  {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                </div>

                <button
                  type="submit"
                  className="w-50 mr-20 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={isSubmitting}
                >
                  {isEditing ? "Update Employee" : "Create Employee"}

                </button>
                <button
                  type="reset"
                  className="w-50  text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Form;

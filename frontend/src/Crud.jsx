import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CRUD = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    employee_id: "",
    email: "",
    number: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/employee/getall");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate('/form');
    setFormData({
      firstname: "",
      lastname: "",
      employee_id: "",
      email: "",
      number: "",
      department: "",
      dateOfJoining: "",
      role: "",
    });
    setIsEditing(false);
    fetchEmployees();
  };

  const handleEdit = (employee) => {
    localStorage.setItem("employeeData", JSON.stringify(employee));
        navigate("/form", { state: { data:employees } });
        console.log(employees);
    setFormData(employee);
    setIsEditing(true);
    setCurrentId(employee.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:3000/api/employee/delete/${id}`);
        alert("Employee deleted successfully!");
        fetchEmployees();
      } catch (error) {
        alert("Error deleting employee!");
        console.error(error);
      }
    }
  };

  return (
    <main>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
            Employee Management
          </h1>

          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Employee" : "Add Employee"}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Reuse input fields from your existing form */}
              {/* ... */}
              <button
                type="submit"
                className="w-50 mr-20 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isEditing ? "Update Employee" : "Create Employee"}
              </button>
            </form>
          </div>

          {/* Table Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Employee List</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="py-2 px-4 border-b">
                      {employee.firstname} {employee.lastname}
                    </td>
                    <td className="py-2 px-4 border-b">{employee.email}</td>
                    <td className="py-2 px-4 border-b">{employee.role}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-500 hover:underline ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CRUD;

import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';
import Axios  from 'axios';



const Users = () => {
  const containerStyle = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100vh', 
    margin: '0 auto', 
    padding: '20px', 
    boxSizing: 'border-box', 
  };

  const [users,setUser]=useState([]);
  const [submitted,setSubmitted]=useState([]);
  const [selectedUser,setSelectedUser]=useState([]);
  const [isEdit,setIsEdit]=useState(false);

  useEffect(()=>{
    getUsersData();
  },[]);

  const getUsersData = () => {
    console.log("Fetching user data...");
    
    Axios.get("http://localhost:8080/api/v1/getusers")
      .then((response) => {
        console.log("Fetched users successfully:", response.data);
        setUser(response.data);  // Update the users state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  
const addUser = (data) => {
  // Check if data is valid
  if (!data.id || !data.name) {
    console.log("Invalid data", data);
    return;  // Do not submit if the data is incomplete
  }

  // Debug: Log the data before adding
  console.log("User data before adding:", data);
  
  // Ensure form is not submitted multiple times
  if (!submitted) {
    setSubmitted(true);  // Prevent double submission
    
    const payload = {
      id: data.id,
      name: data.name,
    };
    
    // Log the payload to ensure it's correctly formatted
    console.log("Sending payload:", payload);
    
    // Make the POST request
    Axios.post("http://localhost:8080/api/v1/adduser", payload)
      .then((response) => {
        // Success: Log and update UI
        console.log("User added successfully:", response.data);
        getUsersData();  // Refresh the list of users
        setSubmitted(false);  // Reset the submitted flag after success
        setIsEdit(false);  // Reset edit mode (if applicable)
      })
      .catch((error) => {
        // Error: Log the error and reset submission flag
        console.error("Error adding user:", error);
        setSubmitted(false);  // Reset on error
      });
  } else {
    console.log("Form already submitted, please wait.");
  }
};


  const updateUser = (data)=>{
    setSubmitted(true);

    const payload = {
      id:data.id,
      name:data.name,
    };

    Axios.post("http://localhost:8080/api/v1/updateuser",payload)
    .then(()=>{
      console.log("success");
      getUsersData();
      setSubmitted(false);
      isEdit(false);
    })
    .catch((error)=>{
      console.log(error);
    });
  };

  const deleteUser = (data)=>{
    setSubmitted(true);

    const payload={
      id:data.id,
      name:data.name,
    };

    Axios.delete("http://localhost:8080/api/v1/deleteuser",payload)
    .then(()=>{
      console.log("success");
      getUsersData();
      setSubmitted(false);
      isEdit(false);
    })
    .catch((error)=>{
      console.log(error);
    });
  };

  return (
    <div style={containerStyle}>
      <UserForm    addUser={addUser}/>
      <UserTable rows={users} />
    </div>
  );
};

export default Users;

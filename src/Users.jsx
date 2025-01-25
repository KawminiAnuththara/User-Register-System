import React from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';

const users = [
  {
    id: 1,
    name: 'kawmini',
  },
  {
    id: 2,
    name: 'anuththara',
  },
];

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

  return (
    <div style={containerStyle}>
      <UserForm />
      <UserTable rows={users} />
    </div>
  );
};

export default Users;

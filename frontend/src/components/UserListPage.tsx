// UserListPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserForm from './AddUserForm';
import UserList from './UserList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from the mock API endpoint
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (newUser: User) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', newUser);
      const addedUser = response.data;

      // Update the user list
      setUsers((prevUsers) => [...prevUsers, addedUser]);
      toast.success("User added successfully")
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/${userId}`);
      const deletedUser = response.data;

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletedUser.id));
      toast.success("User deleted successfully")

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <UserList users={users} deleteUser={deleteUser} />
      <AddUserForm onAddUser={addUser} />
      <ToastContainer position="bottom-right" autoClose={3000}  />

    </div>
  );
};

export default UserListPage;

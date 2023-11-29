// AddUserForm.tsx
import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "react-toastify";
interface AddUserFormProps {
  onAddUser: (user: User) =>void;
}

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleAddUser = () => {
    // Validate form fields, you can add more validation if needed
    if (!name || !email || !role) {
      toast.error("Please enter all fields");
      return;
    }

    if (role !== "Admin" && role !== "User") {
      toast.error("Role must be either 'Admin' or 'User'");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //used from internet to see if it find email matches
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address: " + email);

      return;
    }
    // Create a new user object
    const newUser: User = {
      name,
      email,
      role,
    };

    onAddUser(newUser);

    // Clear form fields after adding the user
    setName("");
    setEmail("");
    setRole("");
  };

  return (
    <div className="flex justify-center items-center p-2">
      <div
        className="max-w-screen mx-auto mt-8 p-6 rounded-md shadow-lg border-2
      bg-opacity-50 backdrop-filter backdrop-blur-lg "
      >
        <div className="flex gap-x-2 items-center mb-2">
          <UserPlus size={20} strokeWidth={3} />
          <h2 className="text-xl font-semibold">Add New User</h2>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleAddUser}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;

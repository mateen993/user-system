// UserList.tsx
import { Users } from "lucide-react";
import React from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

interface UserListProps {
  users: User[];
  deleteUser: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, deleteUser }) => {
  return (
    <div className="max-w-screen mt-8 p-6 bg-white rounded-md shadow-lg">
      <div className="text-2xl font-bold mb-4 flex gap-x-2 p-4 ">
        <Users size={30} strokeWidth={2.5} /> <span> User List </span>
      </div>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="mb-4 p-4 bg-gray-100 rounded-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

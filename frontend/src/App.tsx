// App.tsx
import React from "react";
import UserListPage from "./components/UserListPage";
import { Database } from "lucide-react";

const App: React.FC = () => {
  return (
    <>
      <div className="bg-white p-2 flex justify-center items-center gap-x-2 text-center rounded-md shadow-md">
        <Database />
        <h1 className="text-xl md:text-3xl font-semibold">
          User Management System
        </h1>
      </div>
      <UserListPage />
    </>
  );
};

export default App;

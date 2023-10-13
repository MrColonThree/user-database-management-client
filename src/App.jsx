import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-5 bg-green-400">
        <h1 className="text-3xl text-center font-semibold">
          User Management System
        </h1>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default App;

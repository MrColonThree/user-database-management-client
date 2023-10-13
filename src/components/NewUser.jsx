import { useState } from "react";
import { useNavigate } from "react-router-dom";
const NewUser = () => {
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const gender = form.get("gender");
    const status = form.get("status");
    const user = { name, email, gender, status };
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("User added successfully");
        }
        e.target.reset();
        navigate("/users");
      });
  };
  return (
    <div className="p-5">
      <div className="text-center space-y-4 mb-5">
        <h2 className="text-3xl ">New User</h2>
        <p>Sign up for an account using the form below</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="your name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Your email
          </label>
          <input
            type="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="flex gap-10 items-center mb-6">
          <h1 className="text-xl text-semibold">Gender</h1>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                value="male"
                name="gender"
                checked={gender === "male"}
                onChange={handleGenderChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                required
              />
            </div>
            <label className="ml-2 text-sm font-medium text-gray-900 ">
              Male
            </label>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                value="female"
                name="gender"
                checked={gender === "female"}
                onChange={handleGenderChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                required
              />
            </div>
            <label className="ml-2 text-sm font-medium text-gray-900 ">
              Female
            </label>
          </div>
        </div>
        <div className="flex gap-10 items-center mb-6">
          <h1 className="text-xl text-semibold">Status</h1>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                value="active"
                name="status"
                checked={status === "active"}
                onChange={handleStatusChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                required
              />
            </div>
            <label className="ml-2 text-sm font-medium text-gray-900 ">
              Active
            </label>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                value="inactive"
                name="status"
                checked={status === "inactive"}
                onChange={handleStatusChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                required
              />
            </div>
            <label className="ml-2 text-sm font-medium text-gray-900 ">
              Inactive
            </label>
          </div>
        </div>
        <input
          type="submit"
          value="Save"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center w-full"
        ></input>
      </form>
    </div>
  );
};

export default NewUser;

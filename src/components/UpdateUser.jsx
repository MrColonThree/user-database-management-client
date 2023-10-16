import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { GiUpgrade } from "react-icons/gi";
import Swal from "sweetalert2";
const UpdateUser = () => {
  const loadedUser = useLoaderData();
  const [gender, setGender] = useState(loadedUser?.gender);
  const [status, setStatus] = useState(loadedUser?.status);
  const navigate = useNavigate();
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const gender = form.get("gender");
    const status = form.get("status");
    const updatedUser = { name, email, gender, status };
    fetch(
      `https://user-system-management-server-pcnp77hpm.vercel.app/users/${loadedUser._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success!", "User updated successfully!", "success");
        }
        e.target.reset();
        navigate("/users");
      });
  };
  return (
    <div className="p-5">
      <Link to="/users">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto pr-4 pl-2 py-2.5 text-center w-full mt-5 flex gap-1 items-center">
          <IoIosArrowBack className="text-xl"></IoIosArrowBack>Back
        </button>
      </Link>
      <div className="text-center mb-5">
        <button
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
          className="text-3xl font-bold p-1 border-b-2 border-black"
          disabled
        >
          Update User
        </button>
      </div>
      <form onSubmit={handleUpdate}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            defaultValue={loadedUser?.name}
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
            defaultValue={loadedUser?.email}
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
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-4 py-2.5 text-center flex items-center gap-2"
        >
          <GiUpgrade className="text-lg"></GiUpgrade>Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;

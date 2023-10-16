import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  const handleDeleteUser = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove User!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://user-system-management-server-pcnp77hpm.vercel.app/users/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = users.filter((user) => user._id !== _id);
              setUsers(remaining);
              Swal.fire("Removed!", "User has been removed.", "success");
            }
          });
      }
    });
    setUsers(users);
  };
  return (
    <div className="max-w-screen-xl mx-auto px-5">
      <Link to="/">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center mt-10 flex gap-1 items-center">
          <AiOutlineUserAdd className="text-lg"></AiOutlineUserAdd> Add User
        </button>
      </Link>
      <div className="text-center mb-5">
        <button
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
          className="text-3xl font-bold p-1 border-b-2 border-black"
          disabled
        >
          Users
        </button>
      </div>
      {users.length === 0 && (
        <div className="text-center text-2xl my-20">There is no user</div>
      )}
      {users.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className=" text-gray-700 uppercase bg-gray-50 text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="bg-white border-b text-center">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.gender}</td>
                  <td className="px-6 py-4">{user.status}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <Link
                      to={`/update/${user._id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="font-medium text-red-600 text-xl hover:underline"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Remove user"
                    >
                      <MdDeleteForever></MdDeleteForever>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Tooltip id="my-tooltip"></Tooltip>
        </div>
      )}
    </div>
  );
};

export default Users;

import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  const handleDeleteUser = (_id) => {
    const isConfirm = window.confirm("Confirm to delete the user?");
    if (isConfirm) {
      fetch(`http://localhost:8000/users/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remaining = users.filter((user) => user._id !== _id);
            setUsers(remaining);
          }
        });
    }
    setUsers(users);
  };
  return (
    <div className="max-w-screen-xl mx-auto">
      <Link to="/">New User</Link>
      {users.length === 0 && (
        <div className="text-center text-2xl my-20">There is no user</div>
      )}
      {users.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
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
                  <td className="px-6 py-4">
                    <Link
                      to={`/update/${user._id}`}
                      className="font-medium text-blue-600 hover:underline mr-5"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;

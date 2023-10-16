import { Link } from "react-router-dom";
import NewUser from "./NewUser";
import { AiOutlineUser } from "react-icons/ai";
const Home = () => {
  return (
    <div>
      <Link to="/users">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center  flex gap-1 items-center mt-10 ml-5">
          <AiOutlineUser className="text-lg"></AiOutlineUser> Users
        </button>
      </Link>
      <NewUser></NewUser>
    </div>
  );
};

export default Home;

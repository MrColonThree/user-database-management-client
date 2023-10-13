import { Link } from "react-router-dom";
import NewUser from "./NewUser";

const Home = () => {
  return (
    <div>
      <h2>This is home</h2>
      <Link to="/users">Users</Link>
      <NewUser></NewUser>
    </div>
  );
};

export default Home;

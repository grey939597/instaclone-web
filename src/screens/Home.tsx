import { logUserOut } from "../apollo";

const Home = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => logUserOut()}>Logout</button>
    </div>
  );
};
export default Home;

const Home = ({ setIsLoggedIn }: any) => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsLoggedIn(false)}>Logout</button>
    </div>
  );
};
export default Home;

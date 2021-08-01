const Login = ({ setIsLoggedIn }: any) => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => setIsLoggedIn(true)}>Login</button>
    </div>
  );
};
export default Login;

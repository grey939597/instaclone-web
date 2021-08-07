import styled, { css } from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

interface ITitleProps {}
interface IContainerProps {}

const Title = styled.h1<ITitleProps>``;

const Container = styled.div<IContainerProps>``;

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => isLoggedInVar(true)}>Login</button>
      <button onClick={() => darkModeVar(true)}>Dark Mode</button>
      <button onClick={() => darkModeVar(false)}>Light Mode</button>
    </Container>
  );
};
export default Login;

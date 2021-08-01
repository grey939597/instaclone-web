import { useState } from "react";
import styled, { css } from "styled-components";
import { isLoggedInVar } from "../apollo";

interface IHeadingStyled {
  mode: boolean;
}

const Title = styled.h1<IHeadingStyled>`
  color: ${(props) => (props.mode ? "#343434" : "#ffffff")};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  ${(props) =>
    props.mode
      ? css`
          font-size: 49px;
        `
      : css`
          text-decoration: underline;
        `}
`;

const Container = styled.div`
  background-color: #f98491;
`;

const StyledButton = styled.button`
  color: #939597;
`;

const Login = () => {
  const [mode, setMode] = useState(false);
  const toggleButtonClick = () => setMode((current) => !current);
  return (
    <Container>
      <Title mode={mode}>Login</Title>
      <button onClick={() => isLoggedInVar(true)}>Login</button>
      <StyledButton onClick={toggleButtonClick}>Click</StyledButton>
    </Container>
  );
};
export default Login;

import styled from "styled-components";

const Button = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

export default Button;

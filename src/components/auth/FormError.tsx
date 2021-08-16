import styled from "styled-components";

interface IFormErrorProps {
  message: string;
}

const SFormError = styled.span`
  color: #e74c3c;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0 10px;
`;

const FormError = ({ message }: IFormErrorProps) => {
  return message === "" ? null : <SFormError>{message}</SFormError>;
};

export default FormError;

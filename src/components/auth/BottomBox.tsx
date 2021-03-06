import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

interface IBottomBoxProps {
  cta: string;
  link: string;
  linkText: string;
}

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    color: ${(props) => props.theme.accent};
    margin-left: 5px;
  }
`;

const BottomBox = ({ cta, link, linkText }: IBottomBoxProps) => {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
};

export default BottomBox;

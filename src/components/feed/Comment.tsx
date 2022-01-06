import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Comment = ({ author, payload }: any) => {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word: string, index: number) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
};

export default Comment;

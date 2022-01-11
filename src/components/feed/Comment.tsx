import { gql, useMutation } from "@apollo/client";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      id
      error
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
`;

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

const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
`;

interface ICommnetProps {
  id?: number;
  author: string;
  payload: string | null;
  isMine?: boolean;
  photoId?: number;
}

const Comment = ({ id, author, payload, isMine, photoId }: ICommnetProps) => {
  const updateDeleteComment = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev: number) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload?.split(" ").map((word: string, index: number) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? (
        <DeleteBtn onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </DeleteBtn>
      ) : null}
    </CommentContainer>
  );
};

export default Comment;

import { gql, useMutation } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import { createCommentVariables } from "../../__generated__/createComment";
import Comment from "./Comment";
import useUser from "../../hooks/useUser";
import { COMMENT_FRAGMENT } from "../../fragments";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

interface ICommentsProps {
  photoId: number;
  author: string;
  caption: string | null;
  commentNumber: number;
  comments: (seeFeed_seeFeed_comments | null)[] | null;
}

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0;
  display: block;
  font-weight: 600;
  font-size: 12px;
`;

const Comments = ({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}: ICommentsProps) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();

  const createCommentUpdate = (cache: any, result: any) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: COMMENT_FRAGMENT,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev: [seeFeed_seeFeed_comments]) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev: number) {
            return prev + 1;
          },
        },
      });
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );

  const onValid: SubmitHandler<createCommentVariables> = (data) => {
    if (loading) {
      return;
    }
    const { payload } = data;
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };

  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments &&
        comments.length > 0 &&
        comments.map((comment: any) => (
          <Comment
            key={comment.id}
            id={comment.id}
            author={comment.user.username}
            payload={comment.payload}
            isMine={comment.isMine}
            photoId={photoId}
          />
        ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("payload", { required: true })}
            name="payload"
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
};

export default Comments;

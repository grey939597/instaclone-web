import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Comment = ({ author, payload }: any) => {
  const cleaedPayload = sanitizeHtml(
    payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
    {
      allowedTags: ["mark"],
    }
  );
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleaedPayload,
        }}
      ></CommentCaption>
    </CommentContainer>
  );
};

export default Comment;

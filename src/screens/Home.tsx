import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT } from "../fragments";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
      isLiked
    }
  }
  ${COMMENT_FRAGMENT}
`;

function Home() {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo: seeFeed_seeFeed) => (
        <Photo key={photo.id} {...photo}></Photo>
      ))}
    </div>
  );
}
export default Home;

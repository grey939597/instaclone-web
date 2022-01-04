import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
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
      comments
      createdAt
      isMine
      isLiked
    }
  }
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
